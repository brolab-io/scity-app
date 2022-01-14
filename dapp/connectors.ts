import { getMetaMaskNetworks } from "./config";
import { InjectedConnector } from "@web3-react/injected-connector";
const metaMaskNetworks = getMetaMaskNetworks();

export const POLLING_INTERVAL = Number(
  process.env["NEXT_PUBLIC_POLLING_INTERVAL"] ?? "12000"
);

export const injected = new InjectedConnector({
  supportedChainIds: metaMaskNetworks.map((network: any) =>
    Number(network.chainId)
  ),
});
