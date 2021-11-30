import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { injected } from "../dapp/connectors";
import { useAppContext } from "../components/AppContext";

type BuyOptions = {
  onSuccess?: () => void;
};

const useBuyBox = ({ onSuccess }: BuyOptions = {}) => {
  const [isBuying, setIsBuying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [price, setPrice] = useState(0);
  const { boxContract } = useAppContext();

  const { activate, active, account } = useWeb3React();

  const getPrice = useCallback(async () => {
    if (!boxContract) {
      return;
    }
    const _price = await boxContract.price();
    setPrice(_price);
  }, [boxContract]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  const buy = useCallback(async () => {
    setIsProcessing(true);

    if (!boxContract) {
      return;
    }
    if (!active) {
      try {
        await activate(injected);
      } catch (error) {
        setIsProcessing(false);
        return;
      }
    }

    try {
      const tx = await boxContract.buyBox({
        value: price,
      });
      setIsBuying(true);
      const result = await tx.wait();
      const buyLandEvent = result.events.find(
        (event: ethers.Event) => event.event === "BoxSold"
      );
      const [buyer] = buyLandEvent.args;
      if (buyer === account) {
        toast.success("You successfully bought this box!");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      if (error.code === "UNSUPPORTED_OPERATION") {
        return;
      }
      toast.error(error.data?.message ?? error.message);
    } finally {
      setIsBuying(false);
      setIsProcessing(false);
    }
  }, [account, activate, active, boxContract, onSuccess, price]);

  return useMemo(
    () => ({ buy, isBuying, isProcessing, price }),
    [buy, isBuying, isProcessing, price]
  );
};
export default useBuyBox;
