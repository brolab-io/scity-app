import { ethers } from "ethers";
import { createContext, useCallback, useContext, useMemo } from "react";

import landAbi from "../dapp/abi/land-abi.json";
import boxAbi from "../dapp/abi/box-abi.json";
import companyAbi from "../dapp/abi/company-abi.json";
import privateBox from "../dapp/abi/private-box-abi.json";
import busdAbi from "../dapp/abi/busd-abi.json";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export enum ContractTypes {
  LAND = "LAND",
  BOX = "BOX",
  COMPANY = "COMPANY",
  PRIVATE_BOX = "PRIVATE_BOX",
  BUSD = "BUSD",
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
  [ContractTypes.PRIVATE_BOX]: {
    contractAddress: process.env["NEXT_PUBLIC_CONTRACT_PRIVATE_BOX"] ?? "",
    abi: privateBox,
  },
  [ContractTypes.BUSD]: {
    contractAddress: process.env["NEXT_PUBLIC_CONTRACT_BUSD"] ?? "",
    abi: busdAbi,
  },
};

type EtherContextType = {
  getContract: (contractType: ContractTypes, getSigner?: boolean) => ethers.Contract;
};

const EtherContext = createContext<EtherContextType>({} as EtherContextType);

export const useEtherContext = () => useContext(EtherContext);

const EtherContextProvider: React.FC = ({ children }) => {
  const { library } = useWeb3React<Web3Provider>();

  const getContract = useCallback(
    (contractType: ContractTypes, getSigner?: boolean) => {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error(`No ethereum provider found`);
      }
      if (!contractsAbi[contractType].contractAddress || !contractsAbi[contractType].abi) {
        throw new Error(`No contract address or abi found for ${contractType}`);
      }
      const provider = library ?? new ethers.providers.Web3Provider(window.ethereum as any);

      const contract = new ethers.Contract(
        contractsAbi[contractType].contractAddress,
        contractsAbi[contractType].abi,
        getSigner ? provider.getSigner() : provider
      );

      return contract;
    },
    [library]
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
