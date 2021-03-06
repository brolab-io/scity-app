// ABI STAGING
import landAbiTest from "./abi/test/land-abi.json";
import boxAbiTest from "./abi/test/box-abi.json";
import companyAbiTest from "./abi/test/company-abi.json";
import privatePackAbiTest from "./abi/test/private-pack-abi.json";
import busdAbiTest from "./abi/test/busd-abi.json";
import marketAbiTest from "./abi/test/market-abi.json";

// ABI PRODUCTION
import landAbiProduction from "./abi/production/land-abi.json";
import boxAbiProduction from "./abi/production/box-abi.json";
import companyAbiProduction from "./abi/production/company-abi.json";
import privateBoxProduction from "./abi/production/private-pack-abi.json";
import busdAbiProduction from "./abi/production/busd-abi.json";
import marketAbiProduction from "./abi/production/market-abi.json";

type ENV = "test" | "development" | "staging" | "production";

const env = (process.env["NEXT_PUBLIC_ENV"] || "development") as ENV;

export const getAPIURL = (): string => {
  switch (env) {
    case "development":
    case "staging":
      return "https://staging-api.scity.games";
    case "production":
      return "https://api.scity.games";
    default:
      throw new Error("Invalid environment");
  }
};

export const getMetaMaskNetworks = () => {
  switch (env) {
    case "development":
    case "staging":
      return [
        {
          chainId: "0x61",
          chainName: "BSC Testnet",
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: ["https://data-seed-prebsc-1-s2.binance.org:8545/"],
          blockExplorerUrls: ["https://testnet.bscscan.com"],
        },
      ];

    case "production":
      return [
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
      ];
    default:
      throw new Error("Invalid environment");
  }
};

export enum ContractTypes {
  LAND = "LAND",
  BOX = "BOX",
  COMPANY = "COMPANY",
  PRIVATE_PACK = "PRIVATE_PACK",
  BUSD = "BUSD",
  MARKET = "MARKET",
}

export const getContractConfig = () => {
  switch (env) {
    case "development":
    case "staging":
      return {
        [ContractTypes.LAND]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? "",
          abi: landAbiTest,
        },
        [ContractTypes.BOX]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? "",
          abi: boxAbiTest,
        },
        [ContractTypes.COMPANY]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_COMPANY"] ?? "",
          abi: companyAbiTest,
        },
        [ContractTypes.PRIVATE_PACK]: {
          contractAddress:
            process.env["NEXT_PUBLIC_CONTRACT_PRIVATE_PACK"] ?? "",
          abi: privatePackAbiTest,
        },
        [ContractTypes.BUSD]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_BUSD"] ?? "",
          abi: busdAbiTest,
        },
        [ContractTypes.MARKET]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_MARKET"] ?? "",
          abi: marketAbiTest,
        },
      };
    case "production":
      return {
        [ContractTypes.LAND]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? "",
          abi: landAbiProduction,
        },
        [ContractTypes.BOX]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? "",
          abi: boxAbiProduction,
        },
        [ContractTypes.COMPANY]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_COMPANY"] ?? "",
          abi: companyAbiProduction,
        },
        [ContractTypes.PRIVATE_PACK]: {
          contractAddress:
            process.env["NEXT_PUBLIC_CONTRACT_PRIVATE_PACK"] ?? "",
          abi: privateBoxProduction,
        },
        [ContractTypes.BUSD]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_BUSD"] ?? "",
          abi: busdAbiProduction,
        },
        [ContractTypes.MARKET]: {
          contractAddress: process.env["NEXT_PUBLIC_CONTRACT_MARKET"] ?? "",
          abi: marketAbiProduction,
        },
      };
    default:
      throw new Error("Invalid environment");
  }
};
