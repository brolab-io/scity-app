import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect } from "react";
import { ContractTypes } from "../../dapp/config";
import useContractMutation from "../../hooks/useContractMutation";
import useContractQuery from "../../hooks/useContractQuery";
import EmptyList from "../Common/EmptyList";
import { callPublicRpc } from "../EtherContext";
import LoadingWithLogo from "../UI/LoadingWithLogo";

const MyBoxNFTs = () => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: totalBoxes, isLoading } = useContractQuery(
    ContractTypes.COMPANY,
    "balanceOf",
    [account!],
    {
      enabled: !!account,
    }
  );

  const { data: totalApprovedBox } = useContractQuery(
    ContractTypes.BOX,
    "allowance",
    [account!, process.env["NEXT_PUBLIC_CONTRACT_COMPANY"]],
    {
      enabled: !!account,
    }
  );

  const isApproved = totalApprovedBox && totalApprovedBox.gt(0);

  const {
    isLoading: isOpeningBox,
    mutate: openBox,
    data: contractTx,
  } = useContractMutation(ContractTypes.COMPANY, "openBox");

  useEffect(() => {
    if (contractTx) {
      const getTokenURI = async () => {
        const contractReceipt: ethers.ContractReceipt = await contractTx.wait();
        const openBoxEvent = contractReceipt?.events?.find(
          (event: ethers.Event) => event.event === "OpenBox"
        );
        const [, tokenId] = openBoxEvent?.args || [];
        const businessTokenURI = await callPublicRpc(ContractTypes.COMPANY, "tokenURI", tokenId);
        return businessTokenURI;
      };
      getTokenURI().then(console.log);
    }
  }, [contractTx]);

  return (
    <div>
      {isLoading ? <LoadingWithLogo className="flex justify-center py-40" /> : null}
      {!isLoading && !totalBoxes ? (
        <EmptyList className="flex justify-center py-40" message={`No box`} />
      ) : null}
      <div className="grid grid-cols-2 gap-4 lg:gap-6 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
        {new Array(Number(totalBoxes || 0)).fill(0).map((item, index) => (
          <div key={index} className="p-6 space-y-2 bg-dark rounded-xl">
            <Image width={456} height={426} alt="card" src="/images/icons/box.png" />
            <div className="py-1 mt-4 text-center md:mt-2 lg:mt-1">
              <span className="font-semibold text-white lg:text-lg xl:text-xl">BUSINESS BOX</span>
            </div>
            {isApproved ? (
              <button onClick={openBox} className="w-full rounded-xl button button-magenta">
                <span className="text-[12px] md:text-[14px] lg:text-[16px]">Open</span>
              </button>
            ) : (
              <button className="w-full rounded-xl button button-magenta">
                <span className="text-[12px] md:text-[14px] lg:text-[16px]">Approve Boxes</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBoxNFTs;
