import { ethers } from "ethers";
import { createContext, useCallback, useContext, useMemo } from "react";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import logger from "../lib/logger";
import { ContractTypes, getContractConfig, getMetaMaskNetworks } from "../dapp/bsc.config";

const contractsAbi = getContractConfig();
const metaMaskNetworks = getMetaMaskNetworks();

export const callPublicRpc = (contractType: ContractTypes, method: string, ...args: any) => {
  if (!contractsAbi[contractType].contractAddress || !contractsAbi[contractType].abi) {
    throw new Error(`No contract address or abi found for ${contractType}`);
  }
  const rpcURL = metaMaskNetworks[0].rpcUrls[0];
  logger.debug("callPublicRpc", contractType, method, rpcURL, args);
  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const contract = new ethers.Contract(
    contractsAbi[contractType].contractAddress,
    contractsAbi[contractType].abi,
    provider
  );
  if (!contract[method]) {
    throw new Error(`Method ${method} not found on contract ${contractType}`);
  }
  return contract[method](...args);
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
