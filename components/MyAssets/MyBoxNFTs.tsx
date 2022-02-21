import Image from "next/image";
import { useCallback } from "react";
import { ContractTypes, MIN_FEE } from "../../dapp/near.config";
import useNearContractMutation from "../../hooks/useNearContractMutation";
import EmptyList from "../Common/EmptyList";
import { useNearContext } from "../NearContext";
import LoadingWithLogo from "../UI/LoadingWithLogo";

const MyBoxNFTs = () => {
  const { account } = useNearContext();
  const totalBoxes = 3;
  const { mutate } = useNearContractMutation(ContractTypes.BUSINESS, "open_box");
  const isFetchingTotalBoxes = false;

  const openBox = useCallback(() => {
    mutate({
      args: {},
      amount: MIN_FEE.toLocaleString("fullwide", { useGrouping: false }),
    });
  }, [mutate]);

  return (
    <div>
      {isFetchingTotalBoxes ? <LoadingWithLogo className="flex justify-center py-40" /> : null}
      {!isFetchingTotalBoxes && !totalBoxes ? (
        <EmptyList className="flex justify-center py-40" message={`No box`} />
      ) : null}
      <div className="grid grid-cols-2 gap-4 lg:gap-6 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
        {new Array(Number(totalBoxes || 0)).fill(0).map((item, index) => (
          <div key={index} className="p-6 space-y-2 bg-dark rounded-xl">
            <Image width={456} height={426} alt="card" src="/images/icons/box.png" />
            <div className="py-1 mt-4 text-center md:mt-2 lg:mt-1">
              <span className="font-semibold text-white lg:text-lg xl:text-xl">BUSINESS BOX</span>
            </div>
            <button onClick={openBox} className="w-full rounded-xl button button-magenta">
              <span className="text-[12px] md:text-[14px] lg:text-[16px]">Open</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBoxNFTs;
