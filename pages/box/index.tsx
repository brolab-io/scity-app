import { NextPage } from "next";
import { memo } from "react";
import isEqual from "react-fast-compare";

// Components
import BoxReceived from "../../components/BuyBox/BoxReceived";
import BuyBoxBuySection from "../../components/BuyBox/BuySection";
import BuyBoxSeo from "../../components/BuyBox/SEO";

import { ethers } from "ethers";
import useBoxContract from "../../hooks/useBoxContract";
import useCompanyContract from "../../hooks/useCompanyContract";

const BuyBoxPage: NextPage = () => {
  const {
    price,
    totalSupply,
    isBuying,
    buyBox,
    isBoughtBox,
    isApproved,
    approveBoxes,
    isApprovingBoxes,
  } = useBoxContract();

  const { openBox } = useCompanyContract(false);

  return (
    <>
      <BuyBoxSeo />
      <div className="pt-20 bg-black">
        <BuyBoxBuySection
          currentQuantity={Number(totalSupply.toString())}
          priceInBSC={ethers.utils.formatEther(price)}
          priceInUSD={"6.6"}
          onClickBuyNow={buyBox}
          isProcessing={isBuying}
        />
      </div>
      <BoxReceived
        isLoading={isApprovingBoxes}
        approve={approveBoxes}
        isApproved={isApproved}
        isBoughtBox={isBoughtBox}
        openBox={openBox}
      />
    </>
  );
};

export default memo(BuyBoxPage, isEqual);
