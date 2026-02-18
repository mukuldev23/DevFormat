import type { Metadata } from 'next';
import CssToolsPage from '@/pages/CssToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'CSS Tools - Beautifier and Minifier',
  description: 'Beautify CSS and minify CSS quickly in-browser for cleaner code and faster delivery.',
  path: '/css-tools',
  keywords: ['css formatter', 'css beautifier', 'css minifier']
});

export default function Page() {
  return <CssToolsPage />;
}
