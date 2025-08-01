import fs from 'fs';
import path from 'path';
import { ContentData } from './content';

let cachedContent: ContentData | null = null;
let lastModified = 0;

export async function getServerContent(): Promise<ContentData> {
  try {
    const contentPath = path.join(process.cwd(), 'src/data/content.json');
    
    // Check if file exists and get its modification time
    const stats = fs.statSync(contentPath);
    const fileModified = stats.mtime.getTime();
    
    // If we have cached content and file hasn't been modified, return cached version
    if (cachedContent && fileModified <= lastModified) {
      return cachedContent;
    }
    
    // Read fresh content from file
    const fileContent = fs.readFileSync(contentPath, 'utf8');
    const contentData = JSON.parse(fileContent) as ContentData;
    
    // Update cache
    cachedContent = contentData;
    lastModified = fileModified;
    
    return contentData;
  } catch (error) {
    console.error('Error reading content file:', error);
    
    // Fallback to static import if dynamic reading fails
    try {
      // Use dynamic import instead of require
      const fallbackData = await import('../data/content.json');
      return fallbackData.default as ContentData;
    } catch (fallbackError) {
      console.error('Error with fallback content:', fallbackError);
      throw new Error('Unable to load content data');
    }
  }
}