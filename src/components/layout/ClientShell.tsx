'use client';

import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppShell } from '@/components/layout/AppShell';

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <AppShell>
        {children}
      </AppShell>
      <Toaster richColors position="top-right" closeButton />
    </ErrorBoundary>
  );
}
