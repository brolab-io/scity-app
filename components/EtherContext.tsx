import { ethers } from "ethers";
import { createContext, useCallback, useContext, useMemo } from "react";

import landAbi from "../dapp/abi/land-abi.json";
import boxAbi from "../dapp/abi/box-abi.json";
import companyAbi from "../dapp/abi/company-abi.json";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export enum ContractTypes {
  LAND = "LAND",
  BOX = "BOX",
  COMPANY = "COMPANY",
}

const contractsAbi = {
  [ContractTypes.LAND]: {
    contractAddress: process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? "",
    abi: landAbi,
  },
  [ContractTypes.BOX]: {
    contractAddress: process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? "",
    abi: boxAbi,
  },
  [ContractTypes.COMPANY]: {
    contractAddress: process.env["NEXT_PUBLIC_CONTRACT_COMPANY"] ?? "",
    abi: companyAbi,
  },
};

type EtherContextType = {
  getContract: (contractType: ContractTypes, getSigner?: boolean) => ethers.Contract | undefined;
};

const EtherContext = createContext<EtherContextType>({
  getContract: () => undefined,
});

export const useEtherContext = () => useContext(EtherContext);

const EtherContextProvider: React.FC = ({ children }) => {
  const { library, account } = useWeb3React<Web3Provider>();

  const getContract = useCallback(
    (contractType: ContractTypes, getSigner?: boolean) => {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error(`No ethereum provider found`);
      }
      if (!contractsAbi[contractType].contractAddress || !contractsAbi[contractType].abi) {
        throw new Error(`No contract address or abi found for ${contractType}`);
      }
      const provider = library ?? new ethers.providers.Web3Provider(window.ethereum);

      if (getSigner && !account) {
        throw new Error(`No account found to sign transaction`);
      }

      const contract = new ethers.Contract(
        contractsAbi[contractType].contractAddress,
        contractsAbi[contractType].abi,
        getSigner ? provider.getSigner() : provider
      );

      return contract;
    },
    [account, library]
  );

  const contextValue = useMemo(
    () => ({
      getContract,
    }),
    [getContract]
  );

  return <EtherContext.Provider value={contextValue}>{children}</EtherContext.Provider>;
};

export default EtherContextProvider;
