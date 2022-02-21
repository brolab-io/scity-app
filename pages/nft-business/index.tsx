import { NextPage } from "next";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";

// Components
import BuyBoxBuySection from "../../components/BuyBox/BuySection";
import BuyBoxSeo from "../../components/BuyBox/SEO";

import NewLayout from "../../components/UI/NewLayout";
import { NextSeo } from "next-seo";
import CardRecieved, { CardReceivedRef } from "../../components/BuyLand/CardRecieved";
import useNearContractQuery from "../../hooks/useNearContractQuery";
import { ContractTypes, MIN_FEE } from "../../dapp/near.config";
import useNearContractMutation from "../../hooks/useNearContractMutation";
import { useNearContext } from "../../components/NearContext";
import useNearCallbackQuery from "../../hooks/useNearCallbackQuery";

const BuyBoxPage: NextPage = () => {
  const { data: totalSupply } = useNearContractQuery<number>(
    ContractTypes.BOX,
    "get_total_supply",
    {},
    {
      initValue: 1000000000,
    }
  );
  const { account } = useNearContext();
  const [isBuying, setIsBuying] = useState(false);
  const { mutate } = useNearContractMutation(ContractTypes.BOX, "buy_box");
  const cardReceivedRef = useRef<CardReceivedRef>(null);

  useNearCallbackQuery(console.log);

  const buyBox = useCallback(() => {
    setIsBuying(true);
  }, []);

  useEffect(() => {
    if (isBuying && account) {
      mutate({
        args: {
          receiver_id: account?.accountId,
          amount: "1",
        },
        amount: (1e23 + MIN_FEE).toLocaleString("fullwide", { useGrouping: false }),
      });
    }
  }, [isBuying, mutate, account]);

  return (
    <>
      <NextSeo title="NFT Business" />
      <NewLayout title="NFT Business">
        <BuyBoxSeo />
        <BuyBoxBuySection
          currentQuantity={Number((totalSupply! - 1000000000).toString())}
          priceInBSC="0"
          priceInUSD={"6.6"}
          onClickBuyNow={buyBox}
          isProcessing={isBuying}
        />
        {/* <BoxReceived
          isLoading={isApprovingBoxes}
          approve={approveBoxes}
          isApproved={isApproved}
          isBoughtBox={isBoughtBox}
          openBox={openBox}
        /> */}
      </NewLayout>
      {/*  MODAL SHOW ON CARD RECEIVED!  */}
      <CardRecieved title="You received a business card" ref={cardReceivedRef} />
    </>
  );
};

export default memo(BuyBoxPage, isEqual);
