import type { Metadata } from 'next';
import HtmlToolsPage from '@/pages/HtmlToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'HTML Minifier - Compress HTML Online',
  description: 'Minify HTML by removing unnecessary spaces and comments for faster page delivery.',
  path: '/html-minifier',
  keywords: ['html minifier', 'compress html', 'minify html online']
});

export default function Page() {
  return <HtmlToolsPage initialActionId="minify" />;
}
