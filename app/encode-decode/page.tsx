import type { Metadata } from 'next';
import EncodeDecodePage from '@/pages/EncodeDecodePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Encode / Decode Tools - Base64, URL, JWT, SHA256',
  description: 'Encode and decode Base64 and URLs, decode JWT payloads, generate SHA256 hashes, and encode HTML entities.',
  path: '/encode-decode',
  keywords: ['base64 encode decode', 'url encode decode', 'jwt decoder', 'sha256 generator']
});

export default function Page() {
  return <EncodeDecodePage />;
}
