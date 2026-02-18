# DevFormat - all in one toolkit

A Next.js toolkit with SEO-ready utility pages, optional AdSense, and built-in GA4 traffic tracking.

## Run

```bash
cd /Users/mukulchavan/Documents/Development/DevTools/devtoolkit-ai
npm install
npm run dev
```

## Environment

Create `.env.local` from `.env.example`.

### Required for traffic tracking

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Optional

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=0987654321
```

## What is tracked

- Page views on every route change
- First landing page per session
- UTM/referrer capture (first touch and last touch in localStorage)

## Where tracking is wired

- GA script loader: `src/components/analytics/GoogleAnalytics.tsx`
- Route tracking: `src/components/analytics/PageViewTracker.tsx`
- Included in app layout: `app/layout.tsx`
