import { ConnectConfig, keyStores } from "near-api-js";

const env = process.env.ENV || "development";

export const getNearConfig = (): ConnectConfig => {
  switch (env) {
    case "development":
      return {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        headers: {},
      };

    default:
      throw new Error("Invalid environment");
  }
};

export const MIN_FEE = 25e21;

export enum ContractTypes {
  LAND = "land.scity.testnet",
  BOX = "n-box.scity.testnet",
  BUSINESS = "business.scity.testnet",
}

export const CONTRACTS = {
  [ContractTypes.LAND]: {
    viewMethods: [
      "get_area",
      "get_land",
      "get_lands_by_owner",
      "get_all_areas",
      "nft_tokens_for_owner",
      "nft_supply_for_owner",
    ] as const,
    changeMethods: ["buy_land", "nft_approve"] as const,
  },
  [ContractTypes.BOX]: {
    viewMethods: ["get_total_supply"] as const,
    changeMethods: ["buy_box"] as const,
  },
  [ContractTypes.BUSINESS]: {
    viewMethods: [
      "ft_balance_of",
      "nft_tokens_for_owner",
      "nft_supply_for_owner",
    ] as const,
    changeMethods: ["open_box"] as const,
  },
};
