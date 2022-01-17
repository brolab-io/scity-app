import type { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
  interface NFT {
    image: string;
  }

  interface LandNFT {}
  interface BoxNFT {}
  interface CompanyNFT {}
}
