import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
      serverActions: {}, // Enable Server Actions with default settings
    }
};

export default nextConfig;
