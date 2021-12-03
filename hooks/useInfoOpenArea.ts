import { useAppContext } from "./../components/AppContext";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IAreaInfo } from "../lib/types";
import { ContractTypes, useEtherContext } from "../components/EtherContext";

const useInfoOpenArea = (areaId: string | undefined) => {
  const { getContract } = useEtherContext();
  const [isLoading, setIsLoading] = useState(false);

  const [info, setInfo] = useState<IAreaInfo>({} as IAreaInfo);

  const getCityInfo = useCallback(async () => {
    if (!areaId) {
      return;
    }
    const contract = getContract(ContractTypes.LAND);
    if (!contract) {
      return;
    }

    setIsLoading(true);

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
  }, [areaId, getContract]);

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
