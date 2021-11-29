import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { injected } from "../../dapp/connectors";
import { useAppContext } from "../AppContext";
import Button from "../UI/Button";
import Image from "next/image";

type Props = {
  outline?: boolean;
};

const Connect: React.FC<Props> = ({ outline }) => {
  const { activatingConnector, setActivatingConnector, triedEager } =
    useAppContext();
  const { activate, connector, error } = useWeb3React<Web3Provider>();

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  const handleClick = useCallback(() => {
    setActivatingConnector(injected);
    activate(injected);
  }, [activate, setActivatingConnector]);

  return (
    <Button
      outline={outline}
      isLoading={activating}
      disabled={disabled}
      onClick={handleClick}
      className="text-white rounded-2xl text-sm space-x-2"
    >
      <Image
        src="/images/icons/wallet.svg"
        width={16}
        height={16}
        alt="wallet"
      />
      <span>Connect Wallet</span>
    </Button>
  );
};

export default Connect;
