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

export default function Home() {
  return (
    <>
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
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
