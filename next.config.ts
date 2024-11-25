import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com", // Replace with your hostname
        port: "", // Leave empty unless a specific port is required
        pathname: "/url**", // Match URLs with "/url" and additional query parameters
      },
    ],
  },
};

export default nextConfig;
