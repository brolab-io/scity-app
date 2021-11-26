import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import abi from "../dapp/NFTLand.json";
import { IAreaInfo } from "../lib/types";

const useInfoOpenArea = (areaId: number | undefined) => {
  const { library, active } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState<IAreaInfo>({} as IAreaInfo);

  const getCityInfo = useCallback(async () => {
    if (!areaId) {
      return;
    }
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }
    setIsLoading(true);
    const provider =
      library ?? new ethers.providers.Web3Provider((window as any).ethereum);

    const contract = new ethers.Contract(
      process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? "",
      abi,
      provider
    );
    try {
      const info = await contract.getInfoOpenArea(areaId);
      const [tokens, price, limit, startTime, endTime] = info;
      setInfo({
        price: ethers.utils.formatEther(price),
        limit: limit.toNumber(),
        startTime: startTime.toNumber(),
        endTime: endTime.toNumber(),
        currentQuantity: tokens.length,
      });
    } catch (error: any) {
      toast.error(error.data?.message ?? error.message);
    } finally {
      setIsLoading(false);
    }
  }, [areaId, library]);

  useEffect(() => {
    getCityInfo();
  }, [getCityInfo]);

  const { price, limit, startTime, endTime, currentQuantity } = info;
  return useMemo(
    () => ({
      price,
      limit,
      startTime,
      endTime,
      currentQuantity,
      isLoading,
      reload: getCityInfo,
    }),
    [currentQuantity, endTime, getCityInfo, isLoading, limit, price, startTime]
  );
};

export default useInfoOpenArea;
