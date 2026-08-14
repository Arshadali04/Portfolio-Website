import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.5"],
  // Allow three.js and other ESM packages
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
