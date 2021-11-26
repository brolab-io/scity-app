import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
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

  const buy = useCallback(async () => {
    if (areaId && window && (window as any).ethereum) {
      setIsBuying(true);
      if (!active) {
        await activate(injected);
      }
      const provider =
        library ?? new ethers.providers.Web3Provider((window as any).ethereum);

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
          value: ethers.utils.parseEther("0.01"),
        });
        await tx.wait();
        console.log(tx);
        setIsBuying(false);
        onSuccess && onSuccess();
      } catch (error: any) {
        setIsBuying(false);
        toast.error(error.data?.message ?? error.message);
      }
    }
  }, [activate, active, areaId, library, onSuccess]);

  return {
    isBuying,
    buy,
  };
};
export default useBuyLand;
