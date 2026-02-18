import type { Metadata } from 'next';
import JsonToolsPage from '@/pages/JsonToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'JSON to TypeScript - Generate Interfaces',
  description: 'Convert JSON objects to TypeScript interfaces and types for faster frontend and API development.',
  path: '/json-to-typescript',
  keywords: ['json to typescript', 'json to interface', 'typescript generator']
});

export default function Page() {
  return <JsonToolsPage initialActionId="json-ts" />;
}
