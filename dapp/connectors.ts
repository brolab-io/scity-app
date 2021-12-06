import getConfig from "next/config";
import { InjectedConnector } from "@web3-react/injected-connector";

export const POLLING_INTERVAL = Number(
  process.env["NEXT_PUBLIC_POLLING_INTERVAL"] ?? "12000"
);

const { publicRuntimeConfig } = getConfig();

export const injected = new InjectedConnector({
  supportedChainIds: publicRuntimeConfig.supportedMetaMaskNetworks.map(
    (network: any) => Number(network.chainId)
  ),
});
