import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../components/AppContext";
import abi from "../dapp/abi/land-abi.json";

const useBalance = () => {
  const { library, account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0");
  const { landContract } = useAppContext();

  const getBalance = useCallback(async () => {
    if (!landContract || !account) {
      setBalance("0");
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
  }, [account, landContract, library]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, reload: getBalance, isLoading };
};

export default useBalance;
