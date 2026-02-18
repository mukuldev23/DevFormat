import type { Metadata } from 'next';
import EncodeDecodePage from '@/pages/EncodeDecodePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'URL Decoder - Decode URL Online',
  description: 'Decode percent-encoded URLs and query string values instantly in your browser.',
  path: '/url-decoder',
  keywords: ['url decoder', 'decode url', 'url decode online', 'decode percent encoding']
});

export default function Page() {
  return <EncodeDecodePage initialActionId="url-decode" />;
}
