import { useCallback, useMemo } from "react";
import { useAppContext } from "./../components/AppContext";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../dapp/connectors";
const useConnectWallet = () => {
  const { library, activate, active } = useWeb3React<Web3Provider>();

  const { setActivatingConnector } = useAppContext();

  const connectWallet = useCallback(async () => {
    if (!library) {
      console.log(`Console error: No web3 provider found.`);
      return;
    }
    console.log("connectWallet active", active);
    if (!active) {
      console.log("ConnectWallet: Activating injected");
      setActivatingConnector(injected);
      await activate(injected);
    }
  }, [activate, active, library, setActivatingConnector]);

  return useMemo(() => ({ connectWallet }), [connectWallet]);
};

export default useConnectWallet;
