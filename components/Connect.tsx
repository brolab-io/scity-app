import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { injected } from "../dapp/connectors";
import { useAppContext } from "./AppContext";
import Button from "./Button";

const Connect: React.FC = () => {
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
    <Button isLoading={activating} disabled={disabled} onClick={handleClick}>
      Connect Wallet
    </Button>
  );
};

export default Connect;
