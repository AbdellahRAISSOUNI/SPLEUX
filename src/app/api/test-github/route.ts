import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;

    if (!githubToken || !repoOwner || !repoName) {
      return NextResponse.json({ 
        error: 'Missing GitHub configuration',
        missing: {
          GITHUB_TOKEN: !githubToken,
          GITHUB_REPO_OWNER: !repoOwner,
          GITHUB_REPO_NAME: !repoName
        }
      }, { status: 400 });
    }

    // Test GitHub API access
    const testResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!testResponse.ok) {
      const errorData = await testResponse.json();
      return NextResponse.json({ 
        error: 'GitHub API access failed',
        details: errorData,
        status: testResponse.status
      }, { status: 500 });
    }

    const repoData = await testResponse.json();

    return NextResponse.json({ 
      success: true,
      message: 'GitHub configuration is working',
      repo: {
        name: repoData.name,
        full_name: repoData.full_name,
        permissions: repoData.permissions,
        private: repoData.private
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}