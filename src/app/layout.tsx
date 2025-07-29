import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spleux.com'),
  title: {
    default: "Spleux - Premium Trading Signals & Professional Trading Services",
    template: "%s | Spleux Trading Services"
  },
  description: "Spleux delivers professional trading signals with 97% win rate. Join 35,000+ successful traders with our premium telegram signals service. Expert forex, crypto, and stock trading signals since 2019.",
  keywords: [
    "Spleux",
    "trading signals",
    "telegram trading signals",
    "forex signals",
    "crypto signals",
    "stock trading signals",
    "professional trading",
    "trading academy",
    "forex trading",
    "cryptocurrency trading",
    "binary options",
    "trading education",
    "investment signals",
    "trading alerts",
    "financial trading"
  ],
  authors: [{ name: "Spleux Trading Services", url: "https://spleux.com" }],
  creator: "Spleux Trading Services",
  publisher: "Spleux Trading Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://spleux.com',
    languages: {
      'en-US': 'https://spleux.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spleux.com',
    siteName: 'Spleux Trading Services',
    title: 'Spleux - Premium Trading Signals & Professional Trading Services',
    description: 'Spleux delivers professional trading signals with 97% win rate. Join 35,000+ successful traders with our premium telegram signals service.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Spleux Trading Services - Premium Trading Signals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@spleux',
    creator: '@spleux',
    title: 'Spleux - Premium Trading Signals & Professional Trading Services',
    description: 'Spleux delivers professional trading signals with 97% win rate. Join 35,000+ successful traders.',
    images: ['/twitter-image.jpg'],
  },
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Spleux Trading Services",
              "url": "https://spleux.com",
              "logo": "https://spleux.com/SPLEUX%20LOGO.svg",
              "description": "Professional trading signals service with 97% win rate",
              "foundingDate": "2019",
              "numberOfEmployees": "50+",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://t.me/spleux",
                "https://twitter.com/spleux",
                "https://instagram.com/spleux"
              ]
            })
          }}
        />
        
        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Spleux Trading Services",
              "url": "https://spleux.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://spleux.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${bricolage.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
