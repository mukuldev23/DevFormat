import type { Metadata } from 'next';
import SqlFormatterPage from '@/pages/SqlFormatterPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'SQL Formatter - Online SQL Beautifier',
  description: 'Format SQL queries with readable indentation and uppercase keywords for better reviews and debugging.',
  path: '/sql-formatter',
  keywords: ['sql formatter', 'sql beautifier', 'format sql query']
});

export default function Page() {
  return <SqlFormatterPage />;
}
