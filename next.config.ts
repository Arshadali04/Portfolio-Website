import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow three.js and other ESM packages
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
