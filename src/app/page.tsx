'use client';

import React from 'react';
import {
  Navigation,
  HeroSection,
  FeaturesSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer
} from '@/sections';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export default function Home() {
  return (
    <>
      <AnalyticsTracker />
      {/* Structured Data for the main page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Spleux Trading Services - Premium Trading Signals",
            "description": "Spleux delivers professional trading signals with 97% win rate. Join 35,000+ successful traders with our premium telegram signals service.",
            "url": "https://spleux.com",
            "mainEntity": {
              "@type": "Service",
              "name": "Spleux Trading Signals",
              "description": "Professional trading signals service with 97% win rate",
              "provider": {
                "@type": "Organization",
                "name": "Spleux Trading Services"
              },
              "areaServed": "Worldwide",
              "serviceType": "Trading Signals",
              "offers": {
                "@type": "Offer",
                "price": "99",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://spleux.com"
                }
              ]
            }
          })
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <section data-section="Hero"><HeroSection /></section>
          <section data-section="Features"><FeaturesSection /></section>
          <section data-section="Pricing"><PricingSection /></section>
          <section data-section="Testimonials"><TestimonialsSection /></section>
          <section data-section="FAQ"><FAQSection /></section>
          <section data-section="CTA"><CTASection /></section>
        </main>
        <Footer />
      </div>
    </>
  );
}
