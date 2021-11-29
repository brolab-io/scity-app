import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import abi from "../dapp/abi/box-abi.json";

const useTotalSupply = () => {
  const { library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);

  const contract = useMemo(() => {
    if (typeof window === "undefined" || !window.ethereum) {
      return null;
    }
    const provider =
      library ?? new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? "",
      abi,
      provider
    );
    return contract;
  }, [library]);

  const getTotalSupply = useCallback(async () => {
    if (!contract) {
      return;
    }
    setIsLoading(true);
    try {
      const _totalSupply = await contract.totalSoldBoxes();
      setTotalSupply(_totalSupply);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    getTotalSupply();
  }, [getTotalSupply]);

  useEffect(() => {
    if (contract) {
      contract.on("BoxSold", getTotalSupply);
      return () => {
        contract.removeListener("BoxSold", getTotalSupply);
      };
    }
  }, [contract, getTotalSupply]);

  return { totalSupply, reload: getTotalSupply, isLoading };
};

export default useTotalSupply;
