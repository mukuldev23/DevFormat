import type { Metadata } from 'next';
import CssToolsPage from '@/pages/CssToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'CSS Minifier - Compress CSS Online',
  description: 'Minify CSS to reduce payload size and improve frontend performance.',
  path: '/css-minifier',
  keywords: ['css minifier', 'compress css', 'minify css online']
});

export default function Page() {
  return <CssToolsPage initialActionId="minify" />;
}
