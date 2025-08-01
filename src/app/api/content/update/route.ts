import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 });
    }

    const token = authorization.replace('Bearer ', '');
    const contentData = await request.json();

    // Verify the JWT token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get GitHub configuration
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;

    if (!githubToken || !repoOwner || !repoName) {
      return NextResponse.json({ 
        error: 'GitHub configuration missing. Please set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME in environment variables.' 
      }, { status: 500 });
    }

    // Get current file content from GitHub to get the SHA
    const getCurrentFileResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/src/data/content.json`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let sha = '';
    if (getCurrentFileResponse.ok) {
      const currentFile = await getCurrentFileResponse.json();
      sha = currentFile.sha;
    } else if (getCurrentFileResponse.status !== 404) {
      console.error('Error getting current file:', await getCurrentFileResponse.text());
      return NextResponse.json({ error: 'Failed to get current file from GitHub' }, { status: 500 });
    }

    // Update the content file on GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/src/data/content.json`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update website content via admin dashboard - ${new Date().toISOString()}`,
          content: Buffer.from(JSON.stringify(contentData, null, 2)).toString('base64'),
          sha: sha,
          committer: {
            name: 'Spleux Admin',
            email: 'admin@spleux.com',
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error('GitHub API error:', errorData);
      return NextResponse.json({ 
        error: `Failed to update content on GitHub: ${errorData.message || 'Unknown error'}` 
      }, { status: 500 });
    }

    const updateData = await updateResponse.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Content updated successfully and committed to GitHub. Deployment will start automatically.',
      commit: updateData.commit 
    });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ 
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}