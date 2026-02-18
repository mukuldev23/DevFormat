'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

type AdSlotProps = {
  slot: string;
  className?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
};

export function AdSlot({ slot, className, format = 'auto' }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client || !slot) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore duplicate/rehydration pushes
    }
  }, [client, slot]);

  if (!client || !slot) {
    return null;
  }

  return (
    <div className={className}>
      <p className="mb-2 text-center text-[11px] uppercase tracking-[0.2em] text-slate-400">Advertisement</p>
      <ins
        className="adsbygoogle block overflow-hidden rounded-xl border border-border bg-card"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        suppressHydrationWarning
      />
    </div>
  );
}
