import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { createContext, useContext, useMemo, useState } from "react";
import useEagerConnect from "../hooks/useEagerConnect";

type AppContextState = {
  activatingConnector?: InjectedConnector;
  setActivatingConnector: React.Dispatch<React.SetStateAction<InjectedConnector | undefined>>;
  triedEager: boolean;
};

const AppContext = createContext<AppContextState>({} as AppContextState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [activatingConnector, setActivatingConnector] =
    useState<AppContextState["activatingConnector"]>();

  const { library, account } = useWeb3React<Web3Provider>();

  // THIS MUST BE HERE!!!
  // Intentionally only running on mount (make sure it's only mounted once :))
  const triedEager = useEagerConnect();

  const contextValue = useMemo(
    () => ({
      activatingConnector,
      setActivatingConnector,
      triedEager,
    }),
    [activatingConnector, triedEager]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
