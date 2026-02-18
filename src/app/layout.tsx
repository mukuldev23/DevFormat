import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import Script from 'next/script';
import { AdSenseScript } from '@/components/ads/AdSenseScript';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { ClientShell } from '@/components/layout/ClientShell';
import { buildMetadata, siteConfig } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = buildMetadata({
  title: 'DevFormat - all in one toolkit | JSON Formatter, Diff Checker, SQL Formatter, Encoder Tools',
  description: siteConfig.description,
  path: '/',
  keywords: [
    'diff checker',
    'json formatter',
    'json validator',
    'sql formatter',
    'base64 encode decode',
    'developer toolkit',
    'html minifier',
    'css minifier'
  ]
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "try{const mode=localStorage.getItem('devtoolkit-theme');if(mode){const parsed=JSON.parse(mode);const v=parsed?.state?.mode;document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(v==='light'?'light':'dark');}}catch(e){}"
          }}
        />
        <GoogleAnalytics />
        <AdSenseScript />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
