'use client';

export interface AnalyticsEvent {
  type: 'page_view' | 'button_click' | 'link_click' | 'form_submit' | 'section_view';
  data: {
    page?: string;
    buttonText?: string;
    linkUrl?: string;
    linkText?: string;
    formName?: string;
    sectionName?: string;
    timestamp: number;
    userAgent: string;
    referrer: string;
    pathname: string;
  };
}

export interface AnalyticsStats {
  pageViews: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    pages: { [key: string]: number };
  };
  buttonClicks: {
    total: number;
    buttons: { [key: string]: number };
  };
  linkClicks: {
    total: number;
    links: { [key: string]: number };
  };
  formSubmits: {
    total: number;
    forms: { [key: string]: number };
  };
  sectionViews: {
    total: number;
    sections: { [key: string]: number };
  };
  visitors: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  topReferrers: { [key: string]: number };
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  lastUpdated: string;
}

class AnalyticsManager {
  private isClient = typeof window !== 'undefined';
  
  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    if (!this.isClient) return 'desktop';
    
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  }

  private async sendEvent(event: AnalyticsEvent) {
    if (!this.isClient) return;
    
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }

  trackPageView(page?: string) {
    if (!this.isClient) return;
    
    const event: AnalyticsEvent = {
      type: 'page_view',
      data: {
        page: page || window.location.pathname,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pathname: window.location.pathname
      }
    };
    
    this.sendEvent(event);
  }

  trackButtonClick(buttonText: string) {
    if (!this.isClient) return;
    
    const event: AnalyticsEvent = {
      type: 'button_click',
      data: {
        buttonText,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pathname: window.location.pathname
      }
    };
    
    this.sendEvent(event);
  }

  trackLinkClick(linkUrl: string, linkText?: string) {
    if (!this.isClient) return;
    
    const event: AnalyticsEvent = {
      type: 'link_click',
      data: {
        linkUrl,
        linkText: linkText || linkUrl,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pathname: window.location.pathname
      }
    };
    
    this.sendEvent(event);
  }

  trackFormSubmit(formName: string) {
    if (!this.isClient) return;
    
    const event: AnalyticsEvent = {
      type: 'form_submit',
      data: {
        formName,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pathname: window.location.pathname
      }
    };
    
    this.sendEvent(event);
  }

  trackSectionView(sectionName: string) {
    if (!this.isClient) return;
    
    const event: AnalyticsEvent = {
      type: 'section_view',
      data: {
        sectionName,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pathname: window.location.pathname
      }
    };
    
    this.sendEvent(event);
  }
}

// Create singleton instance
const analytics = new AnalyticsManager();

// Export tracking functions
export const trackPageView = analytics.trackPageView.bind(analytics);
export const trackButtonClick = analytics.trackButtonClick.bind(analytics);
export const trackLinkClick = analytics.trackLinkClick.bind(analytics);
export const trackFormSubmit = analytics.trackFormSubmit.bind(analytics);
export const trackSectionView = analytics.trackSectionView.bind(analytics);

export default analytics;