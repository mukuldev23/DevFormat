import type { Metadata } from 'next';
import TextToolsPage from '@/pages/TextToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Text Diff Checker - Compare Text Side by Side',
  description: 'Free online text diff checker with side-by-side comparison and highlighted added/removed changes.',
  path: '/text-diff-checker',
  keywords: ['diff checker', 'text compare', 'text diff online', 'compare two text files']
});

export default function Page() {
  return <TextToolsPage initialActionId="diff" />;
}
