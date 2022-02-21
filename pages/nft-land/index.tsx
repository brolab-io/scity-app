import { GetServerSideProps, NextPage } from "next";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ICityData } from "../../lib/types";
import CardList from "../../components/BuyLand/CardList";
import CardReceived, { CardReceivedRef } from "../../components/BuyLand/CardRecieved";
import isEqual from "react-fast-compare";
import BuyLandSeo from "../../components/BuyLand/SEO";
import BuyLandBuySection from "../../components/BuyLand/BuySection";
import NewLayout from "../../components/UI/NewLayout";
import useNearContractQuery from "../../hooks/useNearContractQuery";
import { ContractTypes, MIN_FEE } from "../../dapp/near.config";
import { utils } from "near-api-js";
import useNearContractMutation from "../../hooks/useNearContractMutation";
import useNearCallbackQuery from "../../hooks/useNearCallbackQuery";

// near call land.scity.testnet open_area '{"name":"toronto","limit":900,"price":"100000000000000000000000","open_time":1645030800,"close_time":1650128399}' --accountId scity.testnet
const cities = [
  {
    name: "Toronto",
    slug: "toronto",
    image: "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/Toronto_uohpdi.png",
    numberOfSlots: 900,
    price: "0.1",
    openTime: "2022-02-16T17:00:00.000Z",
    closeTime: "2022-04-16T16:59:59.999Z",
  },
  {
    name: "Hong Kong",
    slug: "hong-kong",
    image: "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/Hongkong_ie1zwg.png",
    numberOfSlots: 600,
    price: "0.2",
    openTime: "2022-02-16T17:00:00.000Z",
    closeTime: "2022-04-16T16:59:59.999Z",
  },
  {
    name: "Rome",
    slug: "rome",
    image: "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/Rome_tvhg8q.png",
    numberOfSlots: 1200,
    price: "0.05",
    openTime: "2022-02-16T17:00:00.000Z",
    closeTime: "2022-04-16T16:59:59.999Z",
  },
  {
    name: "El Salvador",
    slug: "el-salvador",
    image: "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/ElSalvador_unj1az.png",
    numberOfSlots: 400,
    price: "1",
    openTime: "2022-02-16T17:00:00.000Z",
    closeTime: "2022-04-16T16:59:59.999Z",
  },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug =
    (Array.isArray(context.query?.slug) && context.query?.slug[0]) || context.query?.slug || "";

  try {
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
  const [isBuying, setIsBuying] = useState(false);

  useNearCallbackQuery(console.log);

  const { data: areaInfo } = useNearContractQuery<any>(
    ContractTypes.LAND,
    "get_area",
    {
      name: selectedCity?.slug,
    },
    {
      enabled: !!selectedCity,
    }
  );

  const { mutate } = useNearContractMutation(ContractTypes.LAND, "buy_land");

  const { limit, land_sold: currentQuantity = 0 } = (areaInfo || selectedCity || {}) as any;

  const endTime = (() => {
    if (areaInfo) {
      return new Date(areaInfo.close_time * 1000);
    }
    if (selectedCity) {
      return new Date(selectedCity.closeTime);
    }
    return new Date();
  })();

  const price = (() => {
    if (areaInfo) {
      return utils.format.formatNearAmount(
        areaInfo.land_price.toLocaleString("fullwide", { useGrouping: false })
      );
    }
    if (selectedCity) {
      return selectedCity.price.toString();
    }
    return "0";
  })();

  const buyLand = useCallback(() => {
    setIsBuying(true);
  }, []);

  useEffect(() => {
    if (areaInfo && isBuying) {
      mutate({
        args: {
          name: selectedCity?.slug,
        },
        amount: (areaInfo.land_price + MIN_FEE).toLocaleString("fullwide", { useGrouping: false }),
      });
    }
  }, [isBuying, mutate, selectedCity, areaInfo]);

  // const {
  //   mutate: buyLand,
  //   isLoading: isBuying,
  //   data: { tokenURI: boughtTokenURI, txHash },
  // } = useContractMutation(
  //   ContractTypes.LAND,
  //   "buyLand",
  //   [
  //     selectedCity?.slug,
  //     {
  //       value: utils.parseEther(price),
  //     },
  //   ],
  //   {
  //     enabled: !!selectedCity, // Only enable when city is selected
  //     // Return the URI of the token bought
  //     pipe: async (txTransaction) => {
  //       const txReceipt = await txTransaction.wait();
  //       const buyLandEvent = txReceipt?.events?.find((event: Event) => event.event === "BuyLand");
  //       const [, tokenId] = buyLandEvent?.args || [];
  //       const tokenURI: string = await callPublicRpc(ContractTypes.LAND, "tokenURI", tokenId);
  //       revalidateInfoOpenArea();
  //       return { tokenURI, txHash: txReceipt.transactionHash };
  //     },
  //     initData: {},
  //   }
  // );

  // Fetch metaData once the land is bought and return the URI of the token bought
  // const { data: cardMetaData, isFetching: isFetchingMetaData } = useQuery(
  //   ["nft-lands", boughtTokenURI ?? "", txHash],
  //   getNFTLandMetaData,
  //   {
  //     enabled: !!boughtTokenURI,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retryDelay: 10000,
  //   }
  // );

  // When fetched metaData, show the card
  // useEffect(() => {
  //   if (cardMetaData) {
  //     cardReceivedRef.current?.showCard(cardMetaData);
  //   }
  // }, [cardReceivedRef, cardMetaData]);

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

      {/* {isFetchingInfo || isFetchingMetaData || isBuying ? <Loading /> : null} */}

      {/*  MODAL SHOW ON CARD RECEIVED!  */}
      <CardReceived title="You received a land card" ref={cardReceivedRef} />
    </NewLayout>
  );
};

export default memo(CityPage, isEqual);
