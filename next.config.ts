import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  // Ensure proper handling of client components
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
