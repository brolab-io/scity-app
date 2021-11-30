import { useAppContext } from "./../components/AppContext";
import { useCallback, useEffect, useState } from "react";

const useTotalSupply = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const { boxContract } = useAppContext();

  const getTotalSupply = useCallback(async () => {
    if (!boxContract) {
      return;
    }
    setIsLoading(true);
    try {
      const _totalSupply = await boxContract.totalSoldBoxes();
      setTotalSupply(_totalSupply);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }, [boxContract]);

  useEffect(() => {
    getTotalSupply();
  }, [getTotalSupply]);

  useEffect(() => {
    if (boxContract) {
      boxContract.on("BoxSold", getTotalSupply);
      return () => {
        boxContract.removeListener("BoxSold", getTotalSupply);
      };
    }
  }, [boxContract, getTotalSupply]);

  return { totalSupply, reload: getTotalSupply, isLoading };
};

export default useTotalSupply;
