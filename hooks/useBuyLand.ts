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
  areaId: number | undefined,
  { onSuccess }: BuyOptions = {}
) => {
  const [isBuying, setIsBuying] = useState(false);
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

      const onBuyLand = (
        address: ethers.BigNumber,
        tokenId: ethers.BigNumber,
        price: ethers.BigNumber
      ) => {
        const cardId = tokenId.toNumber();
        // TODO: Show card
        toast.success(`Bought land successfully!`);
      };
      contract.once("BuyLand", onBuyLand);

      try {
        const tx = await contract.buyLand(areaId, {
          value: ethers.utils.parseEther(price),
        });
        await tx.wait();
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

  return useMemo(() => ({ buy, isBuying }), [buy, isBuying]);
};
export default useBuyLand;
