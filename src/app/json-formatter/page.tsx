import type { Metadata } from 'next';
import JsonToolsPage from '@/pages/JsonToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'JSON Formatter - Beautify JSON Online',
  description: 'Format and beautify JSON instantly with readable indentation and easy copy output.',
  path: '/json-formatter',
  keywords: ['json formatter', 'format json online', 'json beautifier']
});

export default function Page() {
  return <JsonToolsPage initialActionId="format" />;
}
