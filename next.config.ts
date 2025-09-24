import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ['prisma', '@prisma/client'],
  },
  
  // Reduce memory usage during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  
  // Optimize output
  output: 'standalone',
  
  // Reduce build time
  swcMinify: true,
}

export default nextConfig;
