import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/admin',
  output: 'export',
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
