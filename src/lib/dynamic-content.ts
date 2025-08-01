import { ContentData } from './content';

// Client-side function to get fresh content
export async function getDynamicContent(): Promise<ContentData> {
  if (typeof window === 'undefined') {
    // Server-side: use the regular getContent function
    const { getContent } = await import('./content');
    return getContent();
  }
  
  try {
    // Client-side: fetch from API
    const response = await fetch('/api/content/get', {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    throw new Error('Failed to fetch content from API');
  } catch (error) {
    console.error('Error fetching dynamic content:', error);
    
    // Fallback to static content
    const { getContent } = await import('./content');
    return getContent();
  }
}