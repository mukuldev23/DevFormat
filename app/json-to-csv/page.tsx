import type { Metadata } from 'next';
import JsonToolsPage from '@/pages/JsonToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'JSON to CSV Converter - Online',
  description: 'Convert JSON objects and arrays into CSV format for spreadsheets and reporting.',
  path: '/json-to-csv',
  keywords: ['json to csv', 'convert json to csv', 'csv converter']
});

export default function Page() {
  return <JsonToolsPage initialActionId="json-csv" />;
}
