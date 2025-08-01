'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

export function AnalyticsTracker() {
  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Track button clicks
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button?.textContent?.trim() || 'Unknown Button';
        const { trackButtonClick } = require('@/lib/analytics');
        trackButtonClick(buttonText);
      }

      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const linkText = link?.textContent?.trim() || link?.getAttribute('href') || 'Unknown Link';
        const { trackLinkClick } = require('@/lib/analytics');
        trackLinkClick(linkText);
      }
    };

    // Track form submissions
    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.id || 'Unknown Form';
      const { trackFormSubmit } = require('@/lib/analytics');
      trackFormSubmit(formName);
    };

    // Track section views using Intersection Observer
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section') || 
                             entry.target.id || 
                             entry.target.className.includes('section') ? 'Section' : 'Unknown Section';
          const { trackSectionView } = require('@/lib/analytics');
          trackSectionView(sectionName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // Trigger when 50% of the section is visible
      rootMargin: '0px'
    });

    // Observe sections
    const sections = document.querySelectorAll('section, [data-section]');
    sections.forEach(section => observer.observe(section));

    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}