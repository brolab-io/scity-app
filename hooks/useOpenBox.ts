import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractReceipt, Event } from "ethers";
import { useMemo } from "react";
import { callPublicRpc } from "../components/EtherContext";
import { ContractTypes, getContractConfig } from "../dapp/bsc.config";
import useContractMutation from "./useContractMutation";
import useContractQuery from "./useContractQuery";

const useOpenBox = () => {
  const { account } = useWeb3React<Web3Provider>();

  // Fetch total number of user boxes
  const {
    data: totalBoxes,
    isLoading: isFetchingTotalBoxes,
    refetch: refetchTotalBoxes,
  } = useContractQuery(ContractTypes.COMPANY, "balanceOf", [account!], {
    enabled: !!account,
  });

  // Check if user has approved boxes to the company contract
  const { data: totalApprovedBox, refetch: recheckApprovedBoxes } =
    useContractQuery(
      ContractTypes.BOX,
      "allowance",
      [account!, getContractConfig().COMPANY.contractAddress],
      {
        enabled: !!account,
      }
    );

  const isApproved = totalApprovedBox && totalApprovedBox.gt(0);

  // Open a box
  const {
    isLoading: isOpeningBox,
    mutate: openBox,
    data: { tokenURI, txHash },
  } = useContractMutation(ContractTypes.COMPANY, "openBox", [], {
    enabled: !!account,
    initData: {},
    pipe: async (contractTx) => {
      recheckApprovedBoxes();
      refetchTotalBoxes();
      const contractReceipt: ContractReceipt = await contractTx.wait();
      const openBoxEvent = contractReceipt?.events?.find(
        (event: Event) => event.event === "OpenBox"
      );
      const [, tokenId] = openBoxEvent?.args || [];
      const tokenURI = await callPublicRpc(
        ContractTypes.COMPANY,
        "tokenURI",
        tokenId
      );
      return { tokenURI, txHash: contractTx.hash };
    },
  });

  return useMemo(() => {
    return {
      isOpeningBox,
      isApproved,
      totalBoxes,
      openBox,
      tokenURI,
      txHash,
      isFetchingTotalBoxes,
    };
  }, [
    isFetchingTotalBoxes,
    isOpeningBox,
    isApproved,
    totalBoxes,
    openBox,
    tokenURI,
    txHash,
  ]);
};

export default useOpenBox;
