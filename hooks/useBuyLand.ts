import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { injected } from "../dapp/connectors";
import abi from "../dapp/NFTLand.json";

type BuyOptions = {
  onSuccess?: () => void;
};

const useBuyLand = (
  areaId: string | undefined,
  { onSuccess }: BuyOptions = {}
) => {
  const [isBuying, setIsBuying] = useState(false);
  const [cardURI, setCardURI] = useState<string | undefined>(undefined);
  const { activate, library, active } = useWeb3React();

  const buy = useCallback(
    async (price: string) => {
      if (!areaId) {
        return;
      }
      if (typeof window === "undefined" || !window.ethereum) {
        return;
      }
      setIsBuying(true);
      if (!active) {
        await activate(injected);
      }
      const provider =
        library ?? new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        process.env["NEXT_PUBLIC_CONTRACT_LAND"] ?? "",
        abi,
        provider.getSigner()
      );

      try {
        const tx = await contract.buyLand(areaId, {
          value: ethers.utils.parseEther(price),
        });
        const result = await tx.wait();
        const buyLandEvent = result.events.find(
          (event: ethers.Event) => event.event === "BuyLand"
        );
        const [, tokenId] = buyLandEvent.args;
        const _cardURI = await contract.tokenURI(tokenId);
        setCardURI(_cardURI);
        onSuccess && onSuccess();
      } catch (error: any) {
        if (error.code === "UNSUPPORTED_OPERATION") {
          return;
        }
        toast.error(error.data?.message ?? error.message);
      } finally {
        setIsBuying(false);
      }
    },
    [activate, active, areaId, library, onSuccess]
  );

  return useMemo(() => ({ buy, isBuying, cardURI }), [buy, isBuying, cardURI]);
};
export default useBuyLand;
