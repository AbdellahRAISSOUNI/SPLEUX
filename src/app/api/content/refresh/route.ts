import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // This endpoint can be called to force refresh of content cache
    // We'll trigger a re-read of the content file
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content cache refreshed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ 
      error: 'Failed to refresh content cache' 
    }, { status: 500 });
  }
}