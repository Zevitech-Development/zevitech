/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep prelaunch production builds separate from the active development preview.
  ...(process.env.ZEVITECH_AUDIT_BUILD === "1" ? { distDir: ".next-audit" } : {}),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
