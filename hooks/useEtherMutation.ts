import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useMemo, useState } from "react";
import { ContractTypes, useEtherContext } from "../components/EtherContext";
import useConnectWallet from "./useConnectWallet";

type UseEtherSWROptions = {
  onSuccess?: (ContractReceipt: ethers.ContractReceipt) => void;
  onError?: (error: Error) => void;
  tokenURIEventName?: string;
};

const useEtherMutation = (
  keys: [ContractTypes, string],
  getSigner?: boolean,
  options: UseEtherSWROptions = {}
) => {
  const { getContract } = useEtherContext();
  const { account } = useWeb3React<Web3Provider>();
  const { connectWallet } = useConnectWallet();

  const [isMutating, setIsMutating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [tokenURI, setTokenURI] = useState<string | null>(null);

  const mutate = useCallback(
    async (...params: any) => {
      setIsMutating(true);
      setError(null);
      try {
        console.log("mutate account:", account);
        if (getSigner && !account) {
          console.log(`Connecting wallet...`);
          await connectWallet();
        }
        const contract = getContract(keys[0], getSigner);

        if (!contract) {
          throw new Error("Contract not found");
        }

        if (!contract[keys[1]]) {
          throw new Error(
            `Contract ${keys[0]} does not have a method ${keys[1]}`
          );
        }

        const tx: ethers.ContractTransaction = await contract[keys[1]](
          ...params
        );
        const contractReceipt: ethers.ContractReceipt = await tx.wait();

        if (options.tokenURIEventName) {
          const event = contractReceipt?.events?.find(
            (event: ethers.Event) => event.event === options.tokenURIEventName
          );
          const [, tokenId] = event?.args || [];
          const tokenURI: string = await contract.tokenURI(tokenId);
          setTokenURI(tokenURI);
        }
        options.onSuccess?.(contractReceipt);

        return contractReceipt;
      } catch (error: any) {
        console.log("useEtherSWR", error);
        options.onError?.(error);
        setError(error);
        setIsError(true);
      } finally {
        setIsMutating(false);
      }
    },
    [account, connectWallet, getContract, getSigner, keys, options]
  );

  return useMemo(
    () => ({
      isMutating,
      mutate,
      isError,
      error,
      tokenURI,
    }),
    [isMutating, mutate, isError, error, tokenURI]
  );
};

export default useEtherMutation;
