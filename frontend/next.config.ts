import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: ['placehold.co', 'freenaturestock.com'],
    dangerouslyAllowSVG: true, // ⚠️ Use only if you trust the external SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
