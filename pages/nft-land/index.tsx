import { GetServerSideProps, NextPage } from "next";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ICityData } from "../../lib/types";
import CardList from "../../components/BuyLand/CardList";
import { useQuery } from "react-query";
import { getNFTLandMetaData, getOpenedCities } from "../../lib/api";
import CardReceived, { CardReceivedRef } from "../../components/BuyLand/CardRecieved";
import isEqual from "react-fast-compare";
import BuyLandSeo from "../../components/BuyLand/SEO";
import BuyLandBuySection from "../../components/BuyLand/BuySection";
import Loading from "../../components/UI/Loading";
import NewLayout from "../../components/UI/NewLayout";
import useContractRPC from "../../hooks/useContractRPC";
import { ContractTypes } from "../../dapp/config";
import { Event, utils } from "ethers";
import useContractMutation from "../../hooks/useContractMutation";
import { callPublicRpc } from "../../components/EtherContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug =
    (Array.isArray(context.query?.slug) && context.query?.slug[0]) || context.query?.slug || "";

  try {
    const cities: ICityData[] = await getOpenedCities();
    return {
      props: {
        cities: cities ?? [],
        slug,
        city: (cities.find((city) => city.slug === slug) || cities[0]) ?? null,
      },
    };
  } catch (error) {
    return { props: { cities: [] } };
  }
};

type Props = {
  cities: ICityData[];
  city: ICityData | null;
};

const CityPage: NextPage<Props> = ({ cities, city }) => {
  const [selectedCity, setSelectedCity] = useState<ICityData | undefined | null>(city);
  const cardReceivedRef = useRef<CardReceivedRef>(null);

  // Fetch info of selected city
  const {
    data: infoOpenedArea,
    isLoading: isFetchingInfo,
    refetch: revalidateInfoOpenArea,
  } = useContractRPC(ContractTypes.LAND, "getInfoOpenArea", [selectedCity?.slug], {
    enabled: !!selectedCity,
  });

  // Map the data to show
  const { price, limit, endTime, currentQuantity } = useMemo(() => {
    const [tokens, price, limit, , endTime] = infoOpenedArea || [];
    return {
      price: ((price && utils.formatEther(price)) || selectedCity?.price?.toString()) ?? "0",
      limit: limit?.toString() ?? selectedCity?.numberOfSlots ?? 0,
      endTime:
        (endTime && new Date(endTime * 1000)) ||
        (selectedCity?.closeTime && new Date(selectedCity.closeTime)) ||
        new Date(),
      currentQuantity: tokens?.length ?? 0,
    };
  }, [infoOpenedArea, selectedCity]);

  const {
    mutate: buyLand,
    isLoading: isBuying,
    data: { tokenURI: boughtTokenURI, txHash },
  } = useContractMutation(
    ContractTypes.LAND,
    "buyLand",
    [
      selectedCity?.slug,
      {
        value: utils.parseEther(price),
      },
    ],
    {
      enabled: !!selectedCity, // Only enable when city is selected
      // Return the URI of the token bought
      pipe: async (txTransaction) => {
        const txReceipt = await txTransaction.wait();
        const buyLandEvent = txReceipt?.events?.find((event: Event) => event.event === "BuyLand");
        const [, tokenId] = buyLandEvent?.args || [];
        const tokenURI: string = await callPublicRpc(ContractTypes.LAND, "tokenURI", tokenId);
        revalidateInfoOpenArea();
        return { tokenURI, txHash: txReceipt.transactionHash };
      },
      initData: {},
    }
  );

  // Fetch metaData once the land is bought and return the URI of the token bought
  const { data: cardMetaData, isFetching: isFetchingMetaData } = useQuery(
    ["nft-lands", boughtTokenURI ?? "", txHash],
    getNFTLandMetaData,
    {
      enabled: !!boughtTokenURI,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryDelay: 10000,
    }
  );

  // When fetched metaData, show the card
  useEffect(() => {
    if (cardMetaData) {
      cardReceivedRef.current?.showCard(cardMetaData);
    }
  }, [cardReceivedRef, cardMetaData]);

  return (
    <NewLayout title="NFT Land">
      <BuyLandSeo selectedCity={selectedCity} />
      <BuyLandBuySection
        cities={cities}
        price={price}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onClickBuyNow={buyLand}
        currentQuantity={currentQuantity}
        endTime={endTime}
        isProcessing={isBuying}
        limit={limit}
      />

      {/*  LIST OF AVAILABLE CARDS CAN BE RECEIVED!  */}
      <div className="pt-10">
        <CardList cards={new Array(Number(20)).fill(0)} />
      </div>

      {isFetchingInfo || isFetchingMetaData || isBuying ? <Loading /> : null}

      {/*  MODAL SHOW ON CARD RECEIVED!  */}
      <CardReceived title="You received a land card" ref={cardReceivedRef} />
    </NewLayout>
  );
};

export default memo(CityPage, isEqual);
