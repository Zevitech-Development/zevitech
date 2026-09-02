/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pinimg.com", "images.unsplash.com"],
  },

  async redirects() {
    return [
      // Permanent 301 from the www host to the canonical apex domain so
      // www.zevitech.com and zevitech.com never both index the same page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zevitech.com" }],
        destination: "https://zevitech.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
