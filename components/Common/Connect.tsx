import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { injected } from "../../dapp/connectors";
import { useAppContext } from "../AppContext";
import Image from "next/image";
import useConnectWallet from "../../hooks/useConnectWallet";
import styles from "./Connect.module.css";
import clsx from "clsx";
import LoadingIcon from "../UI/LoadingIcon";

const Connect: React.FC = () => {
  const { activatingConnector, triedEager } = useAppContext();
  const { connector, error } = useWeb3React<Web3Provider>();
  const { connectWallet } = useConnectWallet();

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  // console.log(!triedEager, !!activatingConnector, connected, !!error);

  const handleClick = useCallback(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <button
      // isLoading={activating}
      disabled={disabled || activating}
      onClick={handleClick}
      className={clsx(
        styles.connect,
        "text-sm text-white px-6 py-2.5 rounded-full flex items-center space-x-3",
        "hover:opacity-80 duration-200",
        "disabled:opacity-60 duration-200 "
      )}
    >
      {activating ? (
        <LoadingIcon className="w-4 h-4" />
      ) : (
        <Image src="/images/icons/wallet.svg" width={16} height={16} alt="wallet" />
      )}
      <span className="whitespace-nowrap">Connect Wallet</span>
    </button>
  );
};

export default Connect;
