import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { injected } from "../dapp/connectors";
import abi from "../dapp/abi/box-abi.json";

type BuyOptions = {
  onSuccess?: () => void;
};

const useBuyBox = ({ onSuccess }: BuyOptions = {}) => {
  const [isBuying, setIsBuying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [price, setPrice] = useState(0);

  const { activate, library, active, account } = useWeb3React();

  const getPrice = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }
    const provider =
      library ?? new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? "",
      abi,
      provider
    );
    const _price = await contract.price();
    setPrice(_price);
  }, [library]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  const buy = useCallback(async () => {
    setIsProcessing(true);

    if (typeof window === "undefined" || !window.ethereum) {
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
    const provider =
      library ?? new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      process.env["NEXT_PUBLIC_CONTRACT_BOX"] ?? "",
      abi,
      provider.getSigner()
    );

    try {
      const tx = await contract.buyBox({
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
  }, [account, activate, active, library, onSuccess, price]);

  return useMemo(
    () => ({ buy, isBuying, isProcessing, price }),
    [buy, isBuying, isProcessing, price]
  );
};
export default useBuyBox;
