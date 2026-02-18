import type { Metadata } from 'next';
import CssToolsPage from '@/pages/CssToolsPage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'CSS Beautifier - Format CSS Online',
  description: 'Beautify and format CSS with readable spacing and indentation.',
  path: '/css-beautifier',
  keywords: ['css beautifier', 'css formatter', 'pretty css']
});

export default function Page() {
  return <CssToolsPage initialActionId="beautify" />;
}
