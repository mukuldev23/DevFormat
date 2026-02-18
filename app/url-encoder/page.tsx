import type { Metadata } from 'next';
import EncodeDecodePage from '@/pages/EncodeDecodePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'URL Encoder - Encode URL Online',
  description: 'Encode URLs safely for query strings and HTTP requests with instant output.',
  path: '/url-encoder',
  keywords: ['url encoder', 'encode url', 'url encode online', 'url percent encode']
});

export default function Page() {
  return <EncodeDecodePage initialActionId="url-encode" />;
}
