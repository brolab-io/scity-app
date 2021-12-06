/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  publicRuntimeConfig: {
    supportedMetaMaskNetworks: [
      {
        chainId: "0x61",
        chainName: "BSC Testnet",
        nativeCurrency: {
          name: "BSC",
          symbol: "BSC",
          decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/land/:slug*",
        destination: "/land",
      },
    ];
  },
};
