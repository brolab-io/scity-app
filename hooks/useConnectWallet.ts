import getConfig from "next/config";
import { waitPromise } from "../utils";
import { useCallback, useMemo } from "react";
import { useAppContext } from "./../components/AppContext";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../dapp/connectors";

const { publicRuntimeConfig } = getConfig();

const isMetaMask = (window: Window & typeof globalThis) => {
  return window.ethereum?.isMetaMask;
};

const switchWallet = async (window: Window & typeof globalThis) => {
  if (isMetaMask(window) && !!window.ethereum?.chainId) {
    const chainId = publicRuntimeConfig.supportedMetaMaskNetworks[0].chainId;
    if (chainId && window.ethereum.chainId !== chainId) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
      return waitPromise(700);
    }
  }
};

const addBSCChain = async (window: Window & typeof globalThis) => {
  const chainId = publicRuntimeConfig.supportedMetaMaskNetworks[0].chainId;
  if (!!window.ethereum?.chainId && window.ethereum.chainId !== chainId) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: publicRuntimeConfig.supportedMetaMaskNetworks,
    });
    return waitPromise(700);
  }
};

const useConnectWallet = () => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const { setActivatingConnector, triedEager } = useAppContext();

  const connectWallet = useCallback(async () => {
    if (active || !triedEager) {
      return;
    }
    await addBSCChain(window);
    await switchWallet(window);
    setActivatingConnector(injected);
    await activate(injected);
  }, [activate, active, setActivatingConnector, triedEager]);

  return useMemo(() => ({ connectWallet }), [connectWallet]);
};

export default useConnectWallet;
