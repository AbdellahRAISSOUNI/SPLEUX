import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { AnalyticsEvent } from '@/lib/analytics';

const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json');

interface StoredAnalyticsEvent extends AnalyticsEvent {
  id: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

async function loadAnalyticsData(): Promise<StoredAnalyticsEvent[]> {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    console.log('Analytics file not found, creating new one');
    return [];
  }
}

async function saveAnalyticsData(events: StoredAnalyticsEvent[]): Promise<void> {
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(events, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();
    
    // Load existing data
    const existingEvents = await loadAnalyticsData();
    
    // Create new event with additional metadata
    const newEvent: StoredAnalyticsEvent = {
      ...event,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      deviceType: getDeviceType(event.data.userAgent)
    };
    
    // Add new event
    existingEvents.push(newEvent);
    
    // Keep only last 10,000 events to prevent file from growing too large
    if (existingEvents.length > 10000) {
      existingEvents.splice(0, existingEvents.length - 10000);
    }
    
    // Save updated data
    await saveAnalyticsData(existingEvents);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}