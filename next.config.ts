import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.APP_NAME || "Kairoo",
    APP_NAME: process.env.APP_NAME || "Kairoo",
  },
  async redirects() {
    return [
      { source: "/business-strategy", destination: "/investors/strategy", permanent: true },
      { source: "/market-analysis", destination: "/investors/market", permanent: true },
      { source: "/investor-deck", destination: "/investors/deck", permanent: true },
      { source: "/technical-architecture", destination: "/investors/architecture", permanent: true },
    ];
  },
};

export default nextConfig;
