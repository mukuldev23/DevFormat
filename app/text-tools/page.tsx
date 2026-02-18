import type { Metadata } from 'next';
import TextToolsPage from '@/pages/TextToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Text Tools - Diff Checker, Case Converter, Word Counter',
  description: 'Run text diff checker, convert cases, remove duplicate lines, and count words with clear output.',
  path: '/text-tools',
  keywords: ['text tools', 'diff checker', 'word counter', 'case converter']
});

export default function Page() {
  return <TextToolsPage />;
}
