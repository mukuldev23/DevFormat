/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return [
      {
        source: '/url-encode',
        destination: '/url-encoder',
        permanent: true
      },
      {
        source: '/url-decode',
        destination: '/url-decoder',
        permanent: true
      },
      {
        source: '/text-compare',
        destination: '/diff-checker',
        permanent: true
      },
      {
        source: '/diffchecker',
        destination: '/diff-checker',
        permanent: true
      },
      {
        source: '/url-encoder-decoder',
        destination: '/encode-decode',
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      }
    ];
  }
};

export default nextConfig;
