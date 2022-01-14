import { ContractTypes } from "./../dapp/config";
import { useEtherContext } from "./../components/EtherContext";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";

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

    try {
      const contract = getContract(type, true);
      const balance = await contract.balanceOf(account);
      setBalance(balance.toNumber());
    } catch (error: any) {
      // toast.error(error.data?.message ?? error.message);
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
