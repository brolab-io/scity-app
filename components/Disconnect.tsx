import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Button from "./Button";

export default function Logout() {
  const { deactivate } = useWeb3React<Web3Provider>();

  return <Button onClick={deactivate}>Deactive</Button>;
}
