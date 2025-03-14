import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure static pages are generated at build time
  output: 'standalone',
  
  // Custom handling for 404s
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/404',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'x-not-found',
            value: 'true',
          },
        ],
      },
    ];
  },

  // Add ESLint config
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },

  // Disable image optimization warning
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
