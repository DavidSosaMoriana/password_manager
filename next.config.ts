import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
    ],
    // Ensure that images in public folder are correctly loaded
    unoptimized: true,
  },
  // Add output configuration for static optimization
  output: 'standalone',
};

export default nextConfig;
