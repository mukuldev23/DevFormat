'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href
    });

    const sessionVisitKey = 'devformat_session_visit_tracked';
    if (!sessionStorage.getItem(sessionVisitKey)) {
      window.gtag('event', 'landing_visit', {
        landing_path: pagePath,
        landing_title: document.title
      });
      sessionStorage.setItem(sessionVisitKey, '1');
    }

    const utm = {
      source: searchParams?.get('utm_source') ?? '',
      medium: searchParams?.get('utm_medium') ?? '',
      campaign: searchParams?.get('utm_campaign') ?? '',
      term: searchParams?.get('utm_term') ?? '',
      content: searchParams?.get('utm_content') ?? ''
    };

    const hasUtm = Object.values(utm).some(Boolean);
    const referrer = document.referrer;

    if (hasUtm || referrer) {
      const payload = {
        ...utm,
        referrer: referrer || '(direct)'
      };

      const firstTouchKey = 'devformat_first_touch';
      const lastTouchKey = 'devformat_last_touch';

      if (!localStorage.getItem(firstTouchKey)) {
        localStorage.setItem(firstTouchKey, JSON.stringify(payload));
      }
      localStorage.setItem(lastTouchKey, JSON.stringify(payload));

      window.gtag('event', 'traffic_source_capture', payload);
    }
  }, [pathname, searchParams]);

  return null;
}
