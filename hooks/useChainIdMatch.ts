import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
const useChainIdMatch = () => {
  const { chainId } = useWeb3React<Web3Provider>();
  console.log("useChainIdMatch", chainId);
};

export default useChainIdMatch;
