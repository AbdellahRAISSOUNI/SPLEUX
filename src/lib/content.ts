import contentData from '@/data/content.json';

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

export function getContent(): ContentData {
  return contentData as ContentData;
}