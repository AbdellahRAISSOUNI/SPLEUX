import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { AnalyticsStats } from '@/lib/analytics';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';
const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json');

interface StoredAnalyticsEvent {
  id: string;
  type: 'page_view' | 'button_click' | 'link_click' | 'form_submit' | 'section_view';
  deviceType: 'desktop' | 'mobile' | 'tablet';
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

async function loadAnalyticsData(): Promise<StoredAnalyticsEvent[]> {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Analytics file not found');
    return [];
  }
}

function isWithinPeriod(timestamp: number, days: number): boolean {
  const now = Date.now();
  const periodStart = now - (days * 24 * 60 * 60 * 1000);
  return timestamp >= periodStart;
}

function generateStats(events: StoredAnalyticsEvent[]): AnalyticsStats {
  const now = Date.now();
  const today = isWithinPeriod(now, 1);
  const thisWeek = isWithinPeriod(now, 7);
  const thisMonth = isWithinPeriod(now, 30);

  // Page views
  const pageViewEvents = events.filter(e => e.type === 'page_view');
  const pageViews = {
    total: pageViewEvents.length,
    today: pageViewEvents.filter(e => isWithinPeriod(e.data.timestamp, 1)).length,
    thisWeek: pageViewEvents.filter(e => isWithinPeriod(e.data.timestamp, 7)).length,
    thisMonth: pageViewEvents.filter(e => isWithinPeriod(e.data.timestamp, 30)).length,
    pages: pageViewEvents.reduce((acc, event) => {
      const page = event.data.pathname || '/';
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  };

  // Button clicks
  const buttonClickEvents = events.filter(e => e.type === 'button_click');
  const buttonClicks = {
    total: buttonClickEvents.length,
    buttons: buttonClickEvents.reduce((acc, event) => {
      const button = event.data.buttonText || 'Unknown Button';
      acc[button] = (acc[button] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  };

  // Link clicks
  const linkClickEvents = events.filter(e => e.type === 'link_click');
  const linkClicks = {
    total: linkClickEvents.length,
    links: linkClickEvents.reduce((acc, event) => {
      const link = event.data.linkText || event.data.linkUrl || 'Unknown Link';
      acc[link] = (acc[link] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  };

  // Form submits
  const formSubmitEvents = events.filter(e => e.type === 'form_submit');
  const formSubmits = {
    total: formSubmitEvents.length,
    forms: formSubmitEvents.reduce((acc, event) => {
      const form = event.data.formName || 'Unknown Form';
      acc[form] = (acc[form] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  };

  // Section views
  const sectionViewEvents = events.filter(e => e.type === 'section_view');
  const sectionViews = {
    total: sectionViewEvents.length,
    sections: sectionViewEvents.reduce((acc, event) => {
      const section = event.data.sectionName || 'Unknown Section';
      acc[section] = (acc[section] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  };

  // Unique visitors (simplified - based on user agent)
  const uniqueUserAgents = new Set();
  const uniqueToday = new Set();
  const uniqueThisWeek = new Set();
  const uniqueThisMonth = new Set();

  pageViewEvents.forEach(event => {
    const ua = event.data.userAgent;
    uniqueUserAgents.add(ua);
    
    if (isWithinPeriod(event.data.timestamp, 1)) uniqueToday.add(ua);
    if (isWithinPeriod(event.data.timestamp, 7)) uniqueThisWeek.add(ua);
    if (isWithinPeriod(event.data.timestamp, 30)) uniqueThisMonth.add(ua);
  });

  const visitors = {
    total: uniqueUserAgents.size,
    today: uniqueToday.size,
    thisWeek: uniqueThisWeek.size,
    thisMonth: uniqueThisMonth.size
  };

  // Top referrers
  const topReferrers = pageViewEvents.reduce((acc, event) => {
    if (event.data.referrer && event.data.referrer !== '') {
      const referrer = new URL(event.data.referrer).hostname;
      acc[referrer] = (acc[referrer] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  // Device stats
  const deviceStats = events.reduce((acc, event) => {
    acc[event.deviceType] = (acc[event.deviceType] || 0) + 1;
    return acc;
  }, { desktop: 0, mobile: 0, tablet: 0 });

  return {
    pageViews,
    buttonClicks,
    linkClicks,
    formSubmits,
    sectionViews,
    visitors,
    topReferrers,
    deviceStats,
    lastUpdated: new Date().toISOString()
  };
}

export async function GET(request: NextRequest) {
  try {
    // Verify JWT token
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
    }

    const token = authorization.substring(7);
    
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Load analytics data
    const events = await loadAnalyticsData();
    
    // Generate stats
    const stats = generateStats(events);
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'Failed to generate analytics stats' }, { status: 500 });
  }
}