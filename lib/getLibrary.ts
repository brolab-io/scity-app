import { POLLING_INTERVAL } from "./../dapp/connectors";
import { Web3Provider } from "@ethersproject/providers";

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}
