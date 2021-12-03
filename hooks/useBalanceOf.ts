import { ContractTypes, useEtherContext } from "./../components/EtherContext";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../components/AppContext";
import abi from "../dapp/abi/land-abi.json";

const useBalanceOf = (type: ContractTypes) => {
  const { account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("0");
  const { getContract } = useEtherContext();

  const getBalance = useCallback(async () => {
    if (!account) {
      setBalance("0");
      return;
    }
    setIsLoading(true);
    const contract = getContract(type, true);
    try {
      const balance = await contract.balanceOf(account);
      setBalance(balance.toNumber());
    } catch (error: any) {
      toast.error(error.data?.message ?? error.message);
    } finally {
      setIsLoading(false);
    }
  }, [account, getContract, type]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return useMemo(
    () => ({ balance, isLoading, getBalance }),
    [balance, getBalance, isLoading]
  );
};

export default useBalanceOf;
