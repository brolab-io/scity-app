import { InjectedConnector } from "@web3-react/injected-connector";

export const POLLING_INTERVAL = Number(
  process.env["NEXT_PUBLIC_POLLING_INTERVAL"] ?? "12000"
);
export const injected = new InjectedConnector({
  supportedChainIds: (process.env["NEXT_PUBLIC_SUPPORTED_CHAIN_IDS"] ?? "")
    .split(",")
    .map((id) => parseInt(id, 10)),
});
