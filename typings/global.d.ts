import type { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
  interface NFT {
    image: string;
  }

  interface LandNFT {
    name: string;
    hash: string;
    description: string | null;
    image: string;
    ownerAddress: string;
    attributes: {
      display_type?: string;
      trait_type: string;
      value: string | number;
    }[];
  }
  interface BoxNFT {}
  interface CompanyNFT {}
}
