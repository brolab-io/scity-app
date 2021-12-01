import { useAppContext } from "./../components/AppContext";
import { ethers } from "ethers";
import { useState, useCallback, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { toast } from "react-toastify";

type Options = {
  onSuccess?: () => void;
};

const useOpenBox = ({ onSuccess }: Options) => {
  const [isLoading, setIsLoading] = useState(false);
  const { companyContract, boxContract } = useAppContext();
  const [cardURI, setCardURI] = useState("");
  const { account } = useWeb3React<Web3Provider>();
  const [totalBoxes, setTotalBoxes] = useState("0");

  const getTotalBoxes = useCallback(async () => {
    if (!boxContract || !account) {
      setTotalBoxes("0");
      return;
    }
    const _totalBoxes = await boxContract.balanceOf(account);
    setTotalBoxes(ethers.utils.formatEther(_totalBoxes));
  }, [account, boxContract]);

  const openBox = useCallback(async () => {
    if (!companyContract) {
      return;
    }
    setIsLoading(true);
    try {
      const tx = await companyContract.openBox();
      const result = await tx.wait();
      const buyLandEvent = result.events.find(
        (event: ethers.Event) => event.event === "OpenBox"
      );
      const [, tokenId] = buyLandEvent.args;
      const _companyURI = await companyContract.tokenURI(tokenId);
      setCardURI(_companyURI);
      onSuccess && onSuccess();
      return getTotalBoxes();
    } catch (error: any) {
      if (error.code === "UNSUPPORTED_OPERATION") {
        return;
      }
      toast.error(error.data?.message ?? error.message);
    } finally {
      setIsLoading(false);
    }
  }, [companyContract, getTotalBoxes]);

  useEffect(() => {
    getTotalBoxes();
  }, [getTotalBoxes]);

  return { isLoading, cardURI, openBox, totalBoxes };
};

export default useOpenBox;
