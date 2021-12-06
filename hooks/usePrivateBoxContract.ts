// import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContractTypes, useEtherContext } from "../components/EtherContext";
import { useWeb3React } from "@web3-react/core";

type UsePrivateBoxData = {
  info: {
    endTime: number;
    limit: number;
    totalSupply: number;
    price: ethers.BigNumber;
  };
  isFetchingInfo: boolean;
  isBuying: boolean;
  isBoughtSuccess: boolean;
  isBoughtFailed: boolean;
  boughtError: any | null;
  isApprovingBUSD: boolean;
  isApprovedBUSD: boolean;
  isCheckingApproval: boolean;
  isFetchingHistories: boolean;
  histories: { buyer: string; buyTime: number }[];
  buyedTransactionHash: string;
};

const usePrivateBoxContract = () => {
  const { getContract } = useEtherContext();
  const { account } = useWeb3React();

  const [data, setData] = useState<UsePrivateBoxData>({
    info: {
      endTime: Date.now() / 1000,
      limit: 0,
      totalSupply: 0,
      price: ethers.BigNumber.from(0),
    },
    isFetchingInfo: false,
    isBuying: false,
    isBoughtSuccess: false,
    isBoughtFailed: false,
    boughtError: null,
    isApprovingBUSD: false,
    isApprovedBUSD: false,
    isCheckingApproval: false,
    histories: [],
    isFetchingHistories: true,
    buyedTransactionHash: "",
  });

  const fetchInfo = useCallback(async () => {
    setData((prevData) => ({ ...prevData, isFetchingInfo: true }));
    try {
      const contract = getContract(ContractTypes.PRIVATE_BOX);
      const [price, saleLimit, endTime] = await Promise.all([
        contract.price(),
        contract.saleLimit(),
        contract.endTime(),
      ]);
      setData((prevData) => ({
        ...prevData,
        isFetchingInfo: false,
        info: {
          ...prevData.info,
          price,
          endTime: Number(endTime),
          limit: Number(saleLimit),
        },
      }));
    } catch (error) {
      setData((prevData) => ({ ...prevData, isFetchingInfo: false }));
      console.log("Fetch Private Box Failed", error);
    }
  }, [getContract]);

  const fetchHistories = useCallback(async () => {
    setData((prevData) => ({
      ...prevData,
      isFetchingHistories: true,
    }));
    try {
      const contract = getContract(ContractTypes.PRIVATE_BOX);
      const contractReceipt: [string, ethers.BigNumber, string][] =
        await contract.getBuyer();

      setData((prevData) => ({
        ...prevData,
        isFetchingHistories: false,
        histories: [
          ...contractReceipt.map((history: any) => ({
            buyer: history[0],
            buyTime: history[1].toNumber(),
          })),
        ].reverse(),
      }));
    } catch (error) {
      setData((prevData) => ({
        ...prevData,
        isFetchingHistories: false,
      }));
      console.log("Fetch Private Box History Failed", error);
    }
  }, [getContract]);

  const checkIsApproved = useCallback(async () => {
    if (!account || data.info.price.gt(0)) {
      return;
    }
    setData((prevData) => ({ ...prevData, isCheckingApproval: true }));

    try {
      const contract = getContract(ContractTypes.BUSD, true);
      const approved: ethers.BigNumber = await contract.allowance(
        account,
        process.env["NEXT_PUBLIC_CONTRACT_PRIVATE_BOX"]
      );
      setData((prevData) => ({
        ...prevData,
        isApproved: approved.gt(0),
        isCheckingApproval: false,
      }));
    } catch (error: any) {
      console.error(`Error checking approval:`, error);
      setData((prevData) => ({ ...prevData, isCheckingApproval: false }));
    }
  }, [account, data.info.price, getContract]);

  const approveBUSD = useCallback(async () => {
    if (!data.info.price.gt(0)) {
      return;
    }
    setData((prevData) => ({
      ...prevData,
      isApprovingBUSD: true,
    }));
    try {
      const contract = getContract(ContractTypes.BUSD, true);
      const contractTx: ethers.ContractTransaction = await contract.approve(
        process.env["NEXT_PUBLIC_CONTRACT_PRIVATE_BOX"],
        data.info.price
      );
      await contractTx.wait();
      setData((prevData) => ({
        ...prevData,
        isApprovingBUSD: false,
        isApprovedBUSD: true,
      }));
    } catch (error) {
      console.log("Approve BUSD Failed", error);
      setData((prevData) => ({
        ...prevData,
        isApprovingBUSD: false,
      }));
    }
  }, [data.info.price, getContract]);

  const buyPrivateBox = useCallback(
    async (email: string, telegramID: string, ref: string) => {
      setData((prevData) => ({
        ...prevData,
        isBuying: true,
        boughtError: null,
        isBoughtFailed: false,
      }));
      try {
        if (!data.isApprovedBUSD) {
          await approveBUSD();
        }
        const contract = getContract(ContractTypes.PRIVATE_BOX, true);
        const contractTx: ethers.ContractTransaction =
          await contract.buyPrivate(email, telegramID, ref);

        const contractReceipt: ethers.ContractReceipt = await contractTx.wait();

        setData((prevData) => ({
          ...prevData,
          isBuying: false,
          isBoughtSuccess: true,
          isApprovedBUSD: false,
          buyedTransactionHash: contractReceipt.transactionHash,
        }));
      } catch (error: any) {
        setData((prevData) => ({
          ...prevData,
          isBuying: false,
          boughtError: error,
          isBoughtFailed: true,
        }));
        console.log("Buy Private Box Failed", error);
        // toast.error(error.data?.message ?? error.message);
      }
    },
    [approveBUSD, data.isApprovedBUSD, getContract]
  );

  useEffect(() => {
    try {
      const contract = getContract(ContractTypes.PRIVATE_BOX);
      const onBuyPrivateSale: ethers.providers.Listener = (
        buyer,
        email,
        telegram,
        ref,
        buyTime
      ) => {
        setData((prevData) => ({
          ...prevData,
          histories: [{ buyer, buyTime }, ...prevData.histories],
        }));
      };
      contract.on("BuyPrivateSale", onBuyPrivateSale);
      return () => {
        contract.off("BuyPrivateSale", onBuyPrivateSale);
      };
    } catch (error) {
      console.log("Please connect to BNC network");
    }
  }, [getContract]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  useEffect(() => {
    checkIsApproved();
  }, [checkIsApproved]);

  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);

  return useMemo(
    () => ({ ...data, fetchInfo, buyPrivateBox, approveBUSD }),
    [data, fetchInfo, buyPrivateBox, approveBUSD]
  );
};

export default usePrivateBoxContract;
