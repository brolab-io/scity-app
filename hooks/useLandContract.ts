import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { getErrorMessage } from "../lib/utils";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useEtherContext } from "../components/EtherContext";
import { IAreaInfo } from "../lib/types";
import useConnectWallet from "./useConnectWallet";
import { ContractTypes } from "../dapp/config";

type LandData = {
  info: Partial<IAreaInfo>;
  isFetchingInfo: boolean;
  boughtTokenId: number;
  boughtTokenURI: string;
  isBuying: boolean;
};

const useLandContract = (area?: string) => {
  const { getContract } = useEtherContext();
  const { account } = useWeb3React<Web3Provider>();
  const { connectWallet } = useConnectWallet();
  const [data, setData] = useState<LandData>({
    info: {},
    isFetchingInfo: false,
    boughtTokenId: 0,
    boughtTokenURI: "",
    isBuying: false,
  });

  const getOpenAreaInfo = useCallback(async () => {
    if (!area) {
      return;
    }
    setData((prevData) => ({ ...prevData, isFetchingInfo: true, info: {} }));
    try {
      const contract = getContract(ContractTypes.LAND);
      const info = await contract.getInfoOpenArea(area);
      const [tokens, price, limit, startTime, endTime] = info;
      setData((prevData) => ({
        ...prevData,
        info: {
          price: ethers.utils.formatEther(price),
          limit: limit.toNumber(),
          startTime: startTime.toNumber(),
          endTime: endTime.toNumber(),
          currentQuantity: tokens.length,
        },
        isFetchingInfo: false,
      }));
    } catch (error: any) {
      setData((prevData) => ({ ...prevData, isFetchingInfo: false }));
      console.log(`Failed to get info for area ${area}`, error);
    } finally {
    }
  }, [area, getContract]);

  const buyLand = useCallback(async () => {
    if (!area || !data.info.price) {
      console.log("No area to buy");
      return;
    }
    setData((prevData) => ({ ...prevData, isBuying: true }));
    try {
      if (!account) {
        await connectWallet();
      }
      const contract = getContract(ContractTypes.LAND, true);
      console.log(data.info.price, ethers.utils.parseEther(data.info.price));
      const contractTx: ethers.ContractTransaction = await contract.buyLand(
        area,
        {
          value: ethers.utils.parseEther(data.info.price),
        }
      );
      const receipt: ethers.ContractReceipt = await contractTx.wait();
      const buyLandEvent = receipt?.events?.find(
        (event: ethers.Event) => event.event === "BuyLand"
      );
      const [, tokenId] = buyLandEvent?.args || [];
      const tokenURI = await contract.tokenURI(tokenId);
      setData((prevData) => ({
        ...prevData,
        boughtTokenId: tokenId.toNumber(),
        boughtTokenURI: tokenURI,
        isBuying: false,
      }));
    } catch (error: any) {
      setData((prevData) => ({ ...prevData, isBuying: false }));
      console.log(`Error buying land:`, error);
      toast.error(getErrorMessage(error));
    }
  }, [account, area, connectWallet, data.info.price, getContract]);

  useEffect(() => {
    getOpenAreaInfo();
  }, [getOpenAreaInfo]);

  return useMemo(
    () => ({
      ...data,
      buyLand,
      getOpenAreaInfo,
    }),
    [buyLand, data, getOpenAreaInfo]
  );
};

export default useLandContract;
