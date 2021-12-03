import { useAppContext } from "./../components/AppContext";
import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useConnectWallet from "./useConnectWallet";
import useEtherMutation from "./useEtherMutation";
import { ContractTypes } from "../components/EtherContext";
import useTokenURI from "./useTokenURI";

type BuyOptions = {
  onSuccess?: () => void;
};

const useBuyLand = (
  areaId: string | undefined,
  { onSuccess }: BuyOptions = {}
) => {
  const [isBuying, setIsBuying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenId, setTokenID] = useState<ethers.BigNumber | undefined>(
    undefined
  );

  const { mutate, isMutating } = useEtherMutation(
    [ContractTypes.LAND, "buyLand"],
    true
  );
  const { tokenURI: cardURI } = useTokenURI([ContractTypes.LAND, tokenId]);

  const buy = useCallback(
    async (price: string) => {
      setIsProcessing(true);

      try {
        const contractReceipt = await mutate(areaId, {
          value: ethers.utils.parseEther(price),
        });

        const buyLandEvent = contractReceipt?.events?.find(
          (event: ethers.Event) => event.event === "BuyLand"
        );
        const [, tokenId] = buyLandEvent?.args || [];
        setTokenID(tokenId);
        onSuccess && onSuccess();
      } catch (error: any) {
        console.log(`Error buying land: ${error}`);
        if (error.code === "UNSUPPORTED_OPERATION") {
          return;
        }
        toast.error(error.data?.message ?? error.message);
      } finally {
        setIsBuying(false);
        setIsProcessing(false);
      }
    },
    [areaId, mutate, onSuccess]
  );

  return useMemo(
    () => ({ buy, isBuying, cardURI, isProcessing }),
    [buy, isBuying, cardURI, isProcessing]
  );
};
export default useBuyLand;
