import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

const routes = [
  '/',
  '/json-tools',
  '/html-tools',
  '/css-tools',
  '/encode-decode',
  '/text-tools',
  '/diff-checker',
  '/sql-formatter',
  '/text-diff-checker',
  '/json-formatter',
  '/json-validator',
  '/json-to-typescript',
  '/json-to-csv',
  '/html-minifier',
  '/html-beautifier',
  '/css-minifier',
  '/css-beautifier',
  '/base64-encode-decode',
  '/url-encoder',
  '/url-decoder'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8
  }));
}
