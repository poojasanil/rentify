import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
        remotePatterns: [
          {
            protocol: 'http', // or 'https' if you are using HTTPS for Strapi
            hostname: 'localhost', // Replace with your Strapi domain
            port: '1337', // Replace with your Strapi port if not default
            pathname: '/uploads/**', // Path to your Strapi uploads folder
          },
        ],
      },
      
        async rewrites() {
    return [
      {
        source: '/top',
        destination: '/recent',
      },
    ]
  },
};

export default nextConfig;
