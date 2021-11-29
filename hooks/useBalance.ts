import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import abi from "../dapp/abi/land-abi.json";

const useBalance = () => {
  const { library, account, active } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }

    if (!active || !account) {
      return;
    }

    setIsLoading(true);
    const provider =
      library ?? new ethers.providers.Web3Provider(window.ethereum);

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
  }, [account, active, library]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, reload: getBalance, isLoading };
};

export default useBalance;
