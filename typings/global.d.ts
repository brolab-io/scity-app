import type { ethers } from "ethers";
declare global {
  interface Window {
    ethereum: providers.ExternalProvider;
  }
}
