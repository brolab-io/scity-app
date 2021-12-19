/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  serverRuntimeConfig: {
    redisOptions: {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      password: process.env.REDIS_PASSWORD,
      legacyMode: true,
    },
  },
  publicRuntimeConfig: {
    supportedMetaMaskNetworks: [
      // {
      //   chainId: "0x61",
      //   chainName: "BSC Testnet",
      //   nativeCurrency: {
      //     name: "BNB",
      //     symbol: "BNB",
      //     decimals: 18,
      //   },
      //   rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      //   blockExplorerUrls: ["https://testnet.bscscan.com"],
      // },
      {
        chainId: "0x38",
        chainName: "Smart Chain - Main Network",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com"],
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
