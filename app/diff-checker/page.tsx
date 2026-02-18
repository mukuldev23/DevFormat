import type { Metadata } from 'next';
import TextToolsPage from '@/pages/TextToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Diff Checker - Compare Text Side by Side',
  description: 'Online diff checker to compare text with side-by-side highlighted differences.',
  path: '/diff-checker',
  keywords: ['diff checker', 'compare text', 'text compare tool', 'difference checker']
});

export default function Page() {
  return <TextToolsPage initialActionId="diff" />;
}
