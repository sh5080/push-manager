import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        oracledb: false,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        "thin/sqlnet/paramParser.js": false,
      };
    }
    return config;
  },
  transpilePackages: ["oracledb"],
};

export default nextConfig;
