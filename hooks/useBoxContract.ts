import { useEtherContext } from "./../components/EtherContext";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useConnectWallet from "./useConnectWallet";
import { ContractTypes } from "../dapp/config";

type BoxData = {
  totalSupply: number;
  price: number;
  isBuying: boolean;
  isApproved: boolean;
  isApprovingBoxes: boolean;
  isFetchingPrice: boolean;
  isFetchingTotalSupply: boolean;
  isCheckingApproval: boolean;
  isBoughtBox: boolean;
};

const useBoxContract = () => {
  const { account } = useWeb3React();
  const { getContract } = useEtherContext();
  const { connectWallet } = useConnectWallet();

  const [data, setData] = useState<BoxData>({
    price: 0,
    totalSupply: 0,
    isBuying: false,
    isApproved: false,
    isFetchingPrice: false,
    isFetchingTotalSupply: false,
    isCheckingApproval: false,
    isBoughtBox: false,
    isApprovingBoxes: false,
  });

  // GET BOX'S PRICE
  const getPrice = useCallback(async () => {
    setData((prevData) => ({ ...prevData, isFetchingPrice: true }));
    try {
      const contract = getContract(ContractTypes.BOX);
      const price = await contract.price();
      setData((prevData) => ({
        ...prevData,
        price: price.toNumber(),
        isFetchingPrice: false,
      }));
    } catch (error) {
      setData((prevData) => ({ ...prevData, isFetchingPrice: false }));
      console.error(`Error getting price:`, error);
    }
  }, [getContract]);

  // CHECK IF USER IS APPROVING BOXES
  const checkIsApproved = useCallback(
    async (value?: ethers.BigNumber) => {
      if (!account) {
        return;
      }
      if (value !== undefined) {
        return setData((prevData) => ({
          ...prevData,
          isApproved: value.gt(0),
        }));
      }
      setData((prevData) => ({ ...prevData, isCheckingApproval: true }));

      try {
        const contract = getContract(ContractTypes.BOX, true);
        const approved: ethers.BigNumber = await contract.allowance(
          account,
          process.env["NEXT_PUBLIC_CONTRACT_COMPANY"]
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
    },
    [account, getContract]
  );

  // BUY BOX METHOD
  const buyBox = useCallback(async () => {
    try {
      setData((prevData) => ({
        ...prevData,
        isBuying: true,
        isBoughtBox: false,
      }));

      if (!account) {
        await connectWallet();
      }

      const contract = getContract(ContractTypes.BOX, true);
      const tx = await contract.buyBox({
        value: data.price,
      });
      const result = await tx.wait();
      const boxSoldEvent = result.events.find(
        (event: ethers.Event) => event.event === "BoxSold"
      );
      const [buyer] = boxSoldEvent.args;
      if (buyer === account) {
        toast.success("You successfully bought this box!");
      }
      setData((prevData) => ({
        ...prevData,
        isBuying: false,
        isBoughtBox: true,
      }));
    } catch (error: any) {
      setData((prevData) => ({ ...prevData, isBuying: false }));
      console.error(`Error buying box:`, error);
      if (error.code === "UNSUPPORTED_OPERATION") {
        return;
      }
      toast.error(error.data?.message ?? error.message);
    }
  }, [account, connectWallet, data.price, getContract]);

  // GET BOX'S TOTAL SUPPLY
  const getTotalSupply = useCallback(async () => {
    setData((prevData) => ({ ...prevData, isFetchingTotalSupply: true }));
    try {
      const contract = getContract(ContractTypes.BOX);
      const totalSupply = await contract.totalSoldBoxes();
      setData((prevData) => ({
        ...prevData,
        totalSupply: totalSupply.toNumber(),
        isFetchingTotalSupply: false,
      }));
    } catch (error: any) {
      setData((prevData) => ({ ...prevData, isFetchingTotalSupply: false }));
      console.error(`Error fetching total supply:`, error);
    }
  }, [getContract]);

  const approveBoxes = useCallback(async () => {
    setData((prevData) => ({ ...prevData, isApprovingBoxes: true }));
    try {
      const contract = getContract(ContractTypes.BOX);
      const tx = await contract.approve(
        process.env["NEXT_PUBLIC_CONTRACT_COMPANY"],
        ethers.constants.MaxUint256
      );
      await tx.wait();
      setData((prevData) => ({
        ...prevData,
        isApprovingBoxes: false,
        isApproved: true,
      }));
    } catch (error: any) {
      setData((prevData) => ({ ...prevData, isApprovingBoxes: false }));
      console.error(`Error approving boxes:`, error);
    }
  }, [getContract]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  useEffect(() => {
    getTotalSupply();
  }, [getTotalSupply]);

  useEffect(() => {
    checkIsApproved();
  }, [checkIsApproved]);

  return useMemo(
    () => ({
      ...data,
      buyBox,
      approveBoxes,
    }),
    [approveBoxes, buyBox, data]
  );
};
export default useBoxContract;
