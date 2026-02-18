import type { Metadata } from 'next';
import HtmlToolsPage from '@/pages/HtmlToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'HTML Tools - Beautifier and Minifier',
  description: 'Beautify HTML with readable indentation or minify HTML for production payload optimization.',
  path: '/html-tools',
  keywords: ['html formatter', 'html beautifier', 'html minifier']
});

export default function Page() {
  return <HtmlToolsPage />;
}
