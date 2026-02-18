import type { Metadata } from 'next';
import HtmlToolsPage from '@/pages/HtmlToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'HTML Beautifier - Format HTML Online',
  description: 'Beautify and format HTML for readability and easier debugging.',
  path: '/html-beautifier',
  keywords: ['html beautifier', 'html formatter', 'pretty html']
});

export default function Page() {
  return <HtmlToolsPage initialActionId="beautify" />;
}
