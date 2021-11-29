import { ethers } from "ethers";
import { NextPage } from "next";
import { memo, useCallback, useState } from "react";
import isEqual from "react-fast-compare";
import BoxReceived from "../../components/BuyBox/BoxReceived";
import BuyBoxBuySection from "../../components/BuyBox/BuySection";
import BuyBoxSeo from "../../components/BuyBox/SEO";
import useBuyBox from "../../hooks/useBuyBox";
import useTotalSupply from "../../hooks/useTotalSupply";

const BuyBoxPage: NextPage = () => {
  const { totalSupply } = useTotalSupply();
  const [isBoxReceived, setIsBoxReceived] = useState(false);

  const onBoxReceived = useCallback(() => {
    setIsBoxReceived(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsBoxReceived(false);
  }, []);

  const {
    buy: onClickBuyNow,
    price,
    isProcessing,
  } = useBuyBox({ onSuccess: onBoxReceived });

  return (
    <>
      <BuyBoxSeo />
      <div className="pt-20 bg-black">
        <BuyBoxBuySection
          currentQuantity={Number(totalSupply.toString())}
          endTime={1638181910}
          priceInBSC={ethers.utils.formatEther(price)}
          priceInUSD={"6.6"}
          onClickBuyNow={onClickBuyNow}
          isProcessing={isProcessing}
        />
      </div>
      <BoxReceived isVisible={isBoxReceived} close={hideModal} />
    </>
  );
};

export default memo(BuyBoxPage, isEqual);
