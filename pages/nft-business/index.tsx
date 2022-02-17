import { NextPage } from "next";
import { memo, useRef } from "react";
import isEqual from "react-fast-compare";

// Components
import BoxReceived from "../../components/BuyBox/BoxReceived";
import BuyBoxBuySection from "../../components/BuyBox/BuySection";
import BuyBoxSeo from "../../components/BuyBox/SEO";

import { ethers } from "ethers";
import useBoxContract from "../../hooks/useBoxContract";
import useCompanyContract from "../../hooks/useCompanyContract";
import NewLayout from "../../components/UI/NewLayout";
import { NextSeo } from "next-seo";
import CardRecieved, { CardReceivedRef } from "../../components/BuyLand/CardRecieved";

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
  const cardReceivedRef = useRef<CardReceivedRef>(null);

  return (
    <>
      <NextSeo title="NFT Business" />
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
      {/*  MODAL SHOW ON CARD RECEIVED!  */}
      <CardRecieved title="You received a business card" ref={cardReceivedRef} />
    </>
  );
};

export default memo(BuyBoxPage, isEqual);
