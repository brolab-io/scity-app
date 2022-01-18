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
import NewLayout from "../../components/UI/NewLayout";

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
    <NewLayout title="NFT Business">
      <BuyBoxSeo />
      <BuyBoxBuySection
        currentQuantity={Number(totalSupply.toString())}
        priceInBSC={ethers.utils.formatEther(price)}
        priceInUSD={"6.6"}
        onClickBuyNow={buyBox}
        isProcessing={isBuying}
      />
      <BoxReceived
        isLoading={isApprovingBoxes}
        approve={approveBoxes}
        isApproved={isApproved}
        isBoughtBox={isBoughtBox}
        openBox={openBox}
      />
    </NewLayout>
  );
};

export default memo(BuyBoxPage, isEqual);
