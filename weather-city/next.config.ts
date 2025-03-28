import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: false,
  compiler: {
    reactRemoveProperties: { 
      properties: ["^data-testid$"] 
    },
  },
};

export default nextConfig;
