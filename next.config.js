/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  async rewrites() {
    return [
      {
        source: "/nft-land/:slug*",
        destination: "/nft-land",
      },
    ];
  },
};
