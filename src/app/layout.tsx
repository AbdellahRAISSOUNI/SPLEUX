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
  title: "Spleux Trading Services - Premium Trading Signals",
  description: "Professional telegram signals service delivering consistent winning trades to serious traders. Join 1000+ active traders with 87% win rate.",
  keywords: "trading signals, telegram trading, forex signals, crypto signals, professional trading",
  authors: [{ name: "Spleux Trading Services" }],
  openGraph: {
    title: "Spleux Trading Services - Premium Trading Signals",
    description: "Professional telegram signals service delivering consistent winning trades to serious traders.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spleux Trading Services - Premium Trading Signals",
    description: "Professional telegram signals service delivering consistent winning trades to serious traders.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
