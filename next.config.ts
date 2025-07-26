import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Ensure proper handling of client components
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
