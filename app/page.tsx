import Link from 'next/link';
import Script from 'next/script';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdSlot } from '@/components/ads/AdSlot';

const tools = [
  { href: '/json-tools', label: 'JSON Tools', desc: 'Formatter, validator, JSON to TypeScript, JSON to CSV' },
  { href: '/diff-checker', label: 'Diff Checker', desc: 'Side-by-side colored compare like diff tools' },
  { href: '/sql-formatter', label: 'SQL Formatter', desc: 'Format and clean SQL quickly' },
  { href: '/url-encoder', label: 'URL Encoder', desc: 'Encode URL strings for safe transport' },
  { href: '/url-decoder', label: 'URL Decoder', desc: 'Decode percent-encoded URLs quickly' },
  { href: '/encode-decode', label: 'Encode / Decode', desc: 'Base64, URL, JWT decode, SHA256' },
  { href: '/html-tools', label: 'HTML Tools', desc: 'Beautifier and minifier' },
  { href: '/css-tools', label: 'CSS Tools', desc: 'Beautifier and minifier' }
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DevFormat - all in one toolkit</CardTitle>
          <CardDescription>
            Fast online tools for JSON formatting, text diff checking, SQL formatting, and encode/decode workflows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.href} className="shadow-none">
                <CardHeader className="pb-1">
                  <CardTitle className="text-base">{tool.label}</CardTitle>
                  <CardDescription>{tool.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild size="sm">
                    <Link href={tool.href}>Open tool</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE ?? ''} className="mx-auto max-w-4xl" format="horizontal" />

      <Script
        id="software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DevFormat - all in one toolkit',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            featureList: [
              'JSON Formatter',
              'JSON Validator',
              'Text Diff Checker',
              'SQL Formatter',
              'Base64 Encode Decode',
              'HTML and CSS Minifier'
            ]
          })
        }}
      />
    </div>
  );
}
