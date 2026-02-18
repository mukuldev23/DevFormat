import type { Metadata } from 'next';
import JsonToolsPage from '@/pages/JsonToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'JSON Tools - Formatter, Validator, JSON to TypeScript, JSON to CSV',
  description: 'Format JSON, validate with line/column errors, minify JSON, and convert JSON to TypeScript or CSV.',
  path: '/json-tools',
  keywords: ['json tools', 'json formatter', 'json validator', 'json to typescript', 'json to csv']
});

export default function Page() {
  return <JsonToolsPage />;
}
