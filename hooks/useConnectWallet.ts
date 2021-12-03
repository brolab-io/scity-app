import { waitPromise } from "./../utils";
import { useCallback, useEffect, useMemo } from "react";
import { useAppContext } from "./../components/AppContext";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { injected, supportedChainIds } from "../dapp/connectors";

const useConnectWallet = () => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const { setActivatingConnector } = useAppContext();

  const connectWallet = useCallback(async () => {
    if (active) {
      console.log("Already connected");
      return;
    }
    console.log("Connected to wallet");
    if (window.ethereum?.isMetaMask && window.ethereum.chainId!!) {
      if (
        supportedChainIds[0] &&
        Number(window.ethereum.chainId) !== supportedChainIds[0]
      ) {
        console.log(`Switching to chainId: ${supportedChainIds[0]}`);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + supportedChainIds[0].toString(16) }],
        });

        await waitPromise(700);
      }
    }
    setActivatingConnector(injected);
    await activate(injected);
  }, [activate, active, setActivatingConnector]);

  return useMemo(() => ({ connectWallet }), [connectWallet]);
};

export default useConnectWallet;
