import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http",  hostname: "quynhantai.org" },
      { protocol: "https", hostname: "quynhantai.org" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "img.vietqr.io" },
      { protocol: "https", hostname: "api.qrserver.com" },
    ],
  },
};

export default nextConfig;
