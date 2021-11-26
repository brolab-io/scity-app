import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import abi from "../dapp/NFTLand.json";

const useBalance = () => {
  const { library, account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (window && (window as any).ethereum) {
      setIsLoading(true);
      const provider =
        library ?? new ethers.providers.Web3Provider((window as any).ethereum);

      const contract = new ethers.Contract(
        process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? "",
        abi,
        provider.getSigner()
      );
      try {
        const balance = await contract.balanceOf(account);
        setBalance(balance.toNumber());
      } catch (error: any) {
        toast.error(error.data?.message ?? error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [account, library]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, reload: getBalance, isLoading };
};

export default useBalance;
