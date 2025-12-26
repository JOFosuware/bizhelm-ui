import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep defaults; App Router is enabled by /app directory
  },
};

export default nextConfig;
