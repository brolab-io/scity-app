import { GetServerSideProps, NextPage } from "next";
import { memo, useEffect, useState } from "react";
import Container from "../../components/UI/Container";
import { ICityData } from "../../lib/types";
import CardList from "../../components/BuyLand/CardList";
import { useQuery } from "react-query";
import { getNFTLandMetaData, getOpenedCities } from "../../lib/api";
import CardReceived from "../../components/BuyLand/CardRecieved";
import isEqual from "react-fast-compare";
import BuyLandSeo from "../../components/BuyLand/SEO";
import BuyLandBuySection from "../../components/BuyLand/BuySection";
import Loading from "../../components/UI/Loading";
import useLandContract from "../../hooks/useLandContract";
import NewLayout from "../../components/UI/NewLayout";

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
    console.log(error);
    return { props: { cities: [] } };
  }
};

type Props = {
  cities: ICityData[];
  city: ICityData | null;
};

const CityPage: NextPage<Props> = ({ cities, city }) => {
  const [selectedCity, setSelectedCity] = useState<ICityData | undefined | null>(city);

  const { info, isFetchingInfo, buyLand, boughtTokenURI, isBuying } = useLandContract(
    selectedCity?.slug
  );

  // Fetch metaData once the land is bought
  const { data: cardMetaData, isFetching: isFetchingMetaData } = useQuery(
    ["nft-lands", boughtTokenURI ?? ""],
    getNFTLandMetaData,
    {
      enabled: !!boughtTokenURI,
      refetchOnWindowFocus: false,
      retryDelay: 2000,
    }
  );

  const price = info.price ?? selectedCity?.price?.toString() ?? "0";
  const currentQuantity = info.currentQuantity ?? 0;
  const endTime =
    (info.endTime && new Date(info.endTime * 1000)) ||
    (selectedCity && new Date(selectedCity.closeTime)) ||
    new Date();

  const limit = info.limit ?? selectedCity?.numberOfSlots ?? 0;

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

      {isFetchingInfo || isBuying ? <Loading /> : null}

      {/*  MODAL SHOW ON CARD RECEIVED!  */}
      <CardReceived isLoading={isFetchingMetaData} cardData={cardMetaData} />
    </NewLayout>
  );
};

export default memo(CityPage, isEqual);
