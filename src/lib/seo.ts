import type { Metadata } from 'next';

export const siteConfig = {
  name: 'DevFormat - all in one toolkit',
  description:
    'All-in-one developer toolkit: JSON formatter/validator, text diff checker, SQL formatter, HTML/CSS minifier, and encoder tools.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  locale: 'en_US'
};

export function buildMetadata({
  title,
  description,
  path,
  keywords
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const canonical = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
