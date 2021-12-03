import { GetServerSideProps, NextPage } from "next";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../components/UI/Container";
import { ICityData } from "../../lib/types";
import useInfoOpenArea from "../../hooks/useInfoOpenArea";
import CardList from "../../components/BuyLand/CardList";
import { useQuery } from "react-query";
import { getNFTLandMetaData, getOpenedCities } from "../../lib/api";
import CardReceived from "../../components/BuyLand/CardRecieved";
import isEqual from "react-fast-compare";
import BuyLandSeo from "../../components/BuyLand/SEO";
import BuyLandBuySection from "../../components/BuyLand/BuySection";
import Loading from "../../components/UI/Loading";
import useEtherMutation from "../../hooks/useEtherMutation";
import { ContractTypes } from "../../components/EtherContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug =
    (Array.isArray(context.params?.slug) && context.params?.slug[0]) || context.params?.slug || "";
  try {
    const cities: ICityData[] = await getOpenedCities();
    return {
      props: {
        cities,
        slug,
        city: (cities.find((city) => city.slug === slug) || cities[0]) ?? null,
      },
    };
  } catch (error) {
    return { props: { error, cities: [] } };
  }
};

type Props = {
  cities: ICityData[];
  city: ICityData | null;
};

const CityPage: NextPage<Props> = ({ cities, city }) => {
  const [selectedCity, setSelectedCity] = useState<ICityData | undefined | null>(city);

  const { price, limit, endTime, isLoading, currentQuantity } = useInfoOpenArea(selectedCity?.slug);

  const { mutate, isMutating, tokenURI } = useEtherMutation([ContractTypes.LAND, "buyLand"], true, {
    tokenURIEventName: "BuyLand",
  });

  // Fetch metaData once the land is bought
  const { data: cardMetaData, isFetching: isFetchingMetaData } = useQuery(
    ["nft-lands", tokenURI ?? ""],
    getNFTLandMetaData,
    {
      enabled: !!tokenURI,
      refetchOnWindowFocus: false,
      retryDelay: 2000,
    }
  );

  useEffect(() => {
    console.log("Data onchain", price, limit, endTime, currentQuantity);
  }, [price, limit, endTime, currentQuantity]);

  useEffect(() => {
    console.log("Data offchain", selectedCity);
  }, [selectedCity]);

  // Button buy selected Land
  const onClickBuyNow = useCallback(() => {
    mutate(selectedCity?.slug, { price });
  }, [mutate, price, selectedCity?.slug]);

  return (
    <>
      <BuyLandSeo selectedCity={selectedCity} />
      <div className="pt-20 bg-black">
        <BuyLandBuySection
          cities={cities}
          price={price}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onClickBuyNow={onClickBuyNow}
          currentQuantity={currentQuantity}
          endTime={
            new Date(endTime * 1000) ||
            (selectedCity?.closeTime && new Date(selectedCity?.closeTime))
          }
          isProcessing={isMutating}
          limit={limit || selectedCity?.numberOfSlots}
        />

        {/*  LIST OF AVAILABLE CARDS CAN BE RECEIVED!  */}
        <Container className="pt-20 pb-10">
          <CardList cards={new Array(Number(20)).fill(0)} />
        </Container>

        {isLoading || isMutating ? <Loading /> : null}

        {/*  MODAL SHOW ON CARD RECEIVED!  */}
        <CardReceived isLoading={isFetchingMetaData} cardData={cardMetaData} />
      </div>
    </>
  );
};

export default memo(CityPage, isEqual);
