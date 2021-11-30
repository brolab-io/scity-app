import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useEagerConnect from "../hooks/useEagerConnect";
import abiLand from "../dapp/abi/land-abi.json";
import abiBox from "../dapp/abi/box-abi.json";
import abiCompany from "../dapp/abi/company-abi.json";

type AppContextState = {
  activatingConnector?: InjectedConnector;
  setActivatingConnector: React.Dispatch<
    React.SetStateAction<InjectedConnector | undefined>
  >;
  triedEager: boolean;
  landContract: ethers.Contract | null;
  boxContract: ethers.Contract | null;
  companyContract: ethers.Contract | null;
};

const AppContext = createContext<AppContextState>({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

const contractAbi = {
  [process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? ""]: abiLand,
  [process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? ""]: abiBox,
  [process.env["NEXT_PUBLIC_CONTRACT_COMPANY"] ?? ""]: abiCompany,
};

export const AppContextProvider: React.FC = ({ children }) => {
  const [activatingConnector, setActivatingConnector] =
    useState<AppContextState["activatingConnector"]>();

  const { library, chainId, account } = useWeb3React<Web3Provider>();

  const getContract = useCallback(
    (contractAddress: string) => {
      if (typeof window === "undefined" || !window.ethereum || !chainId) {
        return null;
      }
      const provider =
        library ?? new ethers.providers.Web3Provider(window.ethereum);

      const _account = account ? provider.getSigner(0) : null;

      console.log(contractAddress);

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi[contractAddress],
        _account ?? provider
      );

      return contract;
    },
    [chainId, library, account]
  );

  const landContract = useMemo(
    () => getContract(process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? ""),
    [getContract]
  );

  const boxContract = useMemo(
    () => getContract(process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? ""),
    [getContract]
  );

  const companyContract = useMemo(
    () => getContract(process.env["NEXT_PUBLIC_CONTRACT_COMPANY"] ?? ""),
    [getContract]
  );

  // THIS MUST BE HERE!!!
  // Intentionally only running on mount (make sure it's only mounted once :))
  const triedEager = useEagerConnect();

  const contextValue = useMemo(
    () => ({
      activatingConnector,
      setActivatingConnector,
      triedEager,
      landContract,
      boxContract,
      companyContract,
    }),
    [
      activatingConnector,
      boxContract,
      companyContract,
      landContract,
      triedEager,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
