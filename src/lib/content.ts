import fs from 'fs';
import path from 'path';

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  originalPrice?: string;
  description: string;
  cta: string;
  popular: boolean;
  badge?: string;
  savings?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LinkItem {
  name: string;
  url: string;
}

export interface ContentData {
  pricing: {
    title: string;
    subtitle: string;
    plans: PricingPlan[];
    freeTrial: {
      title: string;
      description: string;
      cta: string;
    };
  };
  faq: FAQItem[];
  links: {
    primary: {
      contact: string;
      academy: string;
    };
    footer: {
      company: LinkItem[];
      legal: LinkItem[];
    };
  };
  hero: {
    title: string;
    subtitle: string;
    stats: {
      winRate: string;
      members: string;
      vip: string;
      support: string;
      experience: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
  };
}

let cachedContent: ContentData | null = null;
let lastModified = 0;

export function getContent(): ContentData {
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
      const fallbackData = require('@/data/content.json');
      return fallbackData as ContentData;
    } catch (fallbackError) {
      console.error('Error with fallback content:', fallbackError);
      throw new Error('Unable to load content data');
    }
  }
}