const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    useLightningcss: true,
  },
  async redirects() {
    const staticRedirects = [
      {
        source: '/modern',
        destination: '/',
        permanent: true,
      },
    ];

    if (!process.env.POSTGRES_URL) {
      return staticRedirects;
    }

    const { default: postgres } = await import('postgres');
    const sql = postgres(process.env.POSTGRES_URL, {
      ssl: 'allow',
    });

    let redirects = await sql`
      SELECT source, destination, permanent
      FROM redirects;
    `;

    await sql.end();

    return [
      ...staticRedirects,
      ...redirects.map(({ source, destination, permanent }) => ({
        source,
        destination,
        permanent: !!permanent,
      })),
    ];
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    media-src 'none';
    connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com https://va.vercel-scripts.com https://vercel.live wss://vercel.live https://*.codesandbox.io https://*.csb.app https://sandpack-bundler.codesandbox.io;
    font-src 'self' data:;
    frame-src 'self' https://*.codesandbox.io https://*.csb.app https://vercel.live;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export default nextConfig;
