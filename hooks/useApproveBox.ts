import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useState, useCallback, useEffect } from "react";
import { useAppContext } from "../components/AppContext";

const useApproveBox = () => {
  const { account } = useWeb3React<Web3Provider>();
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { boxContract } = useAppContext();

  const checkIsApproved = useCallback(
    async (value?: ethers.BigNumber) => {
      if (value !== undefined) {
        return setIsApproved(value.gt(0));
      }
      if (!boxContract) {
        return false;
      }
      setIsLoading(true);
      try {
        const _isApproved: ethers.BigNumber = await boxContract.allowance(
          account,
          process.env["NEXT_PUBLIC_CONTRACT_COMPANY"]
        );

        setIsApproved(_isApproved.gt(0));
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    },
    [account, boxContract]
  );

  const approve = useCallback(async () => {
    if (!boxContract) {
      return;
    }
    setIsLoading(true);
    try {
      const tx = await boxContract.approve(
        process.env["NEXT_PUBLIC_CONTRACT_COMPANY"],
        ethers.constants.MaxUint256
      );
      await tx.wait();
      setIsApproved(true);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }, [boxContract]);

  useEffect(() => {
    if (boxContract) {
      const opApproval: Parameters<typeof boxContract["on"]>[1] = (
        _,
        __,
        value
      ) => {
        console.log("onApproval", value);
        checkIsApproved(value);
      };

      boxContract.on("Approval", opApproval);
      return () => {
        boxContract.off("Approval", opApproval);
      };
    }
  });

  useEffect(() => {
    checkIsApproved();
  }, [checkIsApproved]);

  return { approve, isApproved, isLoading };
};

export default useApproveBox;
