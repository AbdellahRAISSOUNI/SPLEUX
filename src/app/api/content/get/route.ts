import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get GitHub configuration
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;

    if (!githubToken || !repoOwner || !repoName) {
      // Fallback to local file if GitHub not configured
      const { getContent } = await import('@/lib/content');
      return NextResponse.json(getContent());
    }

    // Get current file content from GitHub
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/src/data/content.json`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        // Add cache busting
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch from GitHub:', response.status, response.statusText);
      // Fallback to local file
      const { getContent } = await import('@/lib/content');
      return NextResponse.json(getContent());
    }

    const fileData = await response.json();
    const contentJson = Buffer.from(fileData.content, 'base64').toString('utf8');
    const contentData = JSON.parse(contentJson);

    return NextResponse.json(contentData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Fallback to local file
    try {
      const { getContent } = await import('@/lib/content');
      return NextResponse.json(getContent());
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Failed to load content' },
        { status: 500 }
      );
    }
  }
}