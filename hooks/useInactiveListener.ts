import { Web3Provider } from "@ethersproject/providers";
import logger from "../lib/logger";

import { injected } from "./../dapp/connectors";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export default function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate, library } = useWeb3React<Web3Provider>();

  // useEffect(() => {
  //   // const onWeb3ReactUpdate = ({ chainId, account }: any) => {
  //   //   if (
  //   //     chainId &&
  //   //     (injected.supportedChainIds || []).includes(Number(chainId))
  //   //   ) {
  //   //     return library?.jsonRpcFetchFunc("wallet_switchEthereumChain", [
  //   //       { chainId: injected.supportedChainIds?.[0] ?? "56" },
  //   //     ]);
  //   //   }
  //   // };

  //   const onWeb3ReactUpdate = (...args: any) =>
  //     console.log("onWeb3ReactUpdate", args);
  //   const onWeb3ReactError = (...args: any) =>
  //     console.log("Web3ReactError", args);
  //   const onWeb3ReactDeactivate = (...args: any) =>
  //     console.log("Web3ReactDeactivate", args);

  //   injected.on("Web3ReactUpdate", onWeb3ReactUpdate);
  //   injected.on("Web3ReactError", onWeb3ReactError);
  //   injected.on("Web3ReactDeactivate", onWeb3ReactDeactivate);
  //   return () => {
  //     injected.removeListener("Web3ReactUpdate", onWeb3ReactUpdate);
  //     injected.removeListener("Web3ReactError", onWeb3ReactError);
  //     injected.removeListener("Web3ReactDeactivate", onWeb3ReactDeactivate);
  //   };
  //   // injected.on("networkChanged", (networkId: number) => {})
  // }, [activate, library]);

  useEffect(() => {
    const ethereum = { window } as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        logger.info("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        logger.info("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        logger.info(
          "Handling 'accountsChanged' event with payload ```````````",
          accounts
        );
        if (accounts.length > 0) {
          activate(injected);
          // return ethereum.request({
          //   method: "wallet_switchEthereumChain",
          //   params: [{ chainId: "0x38" }],
          //   // params: [{ chainId: '0x61' }],
          // });
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        logger.info("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate, library]);
}
