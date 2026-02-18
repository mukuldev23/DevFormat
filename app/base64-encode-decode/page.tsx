import type { Metadata } from 'next';
import EncodeDecodePage from '@/pages/EncodeDecodePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Base64 Encode Decode - Online Tool',
  description: 'Encode and decode Base64 text quickly with instant browser-side output.',
  path: '/base64-encode-decode',
  keywords: ['base64 encode', 'base64 decode', 'base64 tool']
});

export default function Page() {
  return <EncodeDecodePage initialActionId="base64-encode" />;
}
