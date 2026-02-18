import type { Metadata } from 'next';
import JsonToolsPage from '@/pages/JsonToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'JSON Validator - Validate JSON with Line Errors',
  description: 'Validate JSON syntax and quickly find exact line and column of parsing errors.',
  path: '/json-validator',
  keywords: ['json validator', 'validate json', 'json syntax checker']
});

export default function Page() {
  return <JsonToolsPage initialActionId="validate" />;
}
