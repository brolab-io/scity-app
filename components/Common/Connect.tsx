import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { injected } from "../../dapp/connectors";
import { useAppContext } from "../AppContext";
import Button from "../UI/Button";
import Image from "next/image";
import useConnectWallet from "../../hooks/useConnectWallet";

type Props = {
  outline?: boolean;
};

const Connect: React.FC<Props> = ({ outline }) => {
  const { activatingConnector, triedEager } = useAppContext();
  const { connector, error } = useWeb3React<Web3Provider>();
  const { connectWallet } = useConnectWallet();

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  const handleClick = useCallback(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <Button
      outline={outline}
      isLoading={activating}
      disabled={disabled}
      onClick={handleClick}
      className="space-x-2 text-sm text-white rounded-2xl"
    >
      <Image src="/images/icons/wallet.svg" width={16} height={16} alt="wallet" />
      <span>Connect Wallet</span>
    </Button>
  );
};

export default Connect;
