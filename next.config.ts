import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "pub-YOURHASH.r2.dev", // your R2 public URL host only
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "images.clientdomain.com", // if using custom domain later
  //     },
  //   ],
  // },
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: "5mb",
  //   },
  // },
   images: {
    remotePatterns: [],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
