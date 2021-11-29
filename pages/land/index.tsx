import { NextPage } from "next";
import { memo, useCallback, useState } from "react";
import Container from "../../components/UI/Container";
import { ICityData } from "../../lib/types";
import useInfoOpenArea from "../../hooks/useInfoOpenArea";
import useBuyLand from "../../hooks/useBuyLand";
import Cards from "../../components/BuyLand/CardList";
import { useQuery } from "react-query";
import { getNFTLandMetaData, getOpenedCities } from "../../lib/api";
import CardReceived from "../../components/Common/CardRecieved";
import isEqual from "react-fast-compare";
import BuyLandSeo from "../../components/BuyLand/SEO";
import BuyLandBuySection from "../../components/BuyLand/BuySection";

export const getServerSideProps = async () => {
  try {
    const cities = await getOpenedCities();
    return {
      props: { cities },
    };
  } catch (error) {
    return { props: { error, cities: [] } };
  }
};

type Props = {
  cities: ICityData[];
};

const CityPage: NextPage<Props> = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState<ICityData | undefined>(
    cities[0]
  );

  const { price, limit, endTime, isLoading, currentQuantity, reload } =
    useInfoOpenArea(selectedCity?.slug);

  const { buy, cardURI, isBuying, isProcessing } = useBuyLand(
    selectedCity?.slug,
    {
      onSuccess: reload,
    }
  );

  const { data: cardMetaData, isFetching: isFetchingMetaData } = useQuery(
    ["nft-lands", cardURI ?? ""],
    getNFTLandMetaData,
    {
      enabled: !!cardURI,
      refetchOnWindowFocus: false,
    }
  );

  const onClickBuyNow = useCallback(() => {
    buy(price);
  }, [buy, price]);

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
          endTime={endTime}
          isProcessing={isProcessing}
          limit={limit}
        />

        {/*  LIST OF AVAILABLE CARDS CAN BE RECEIVED!  */}
        <Container className="pt-20 pb-10">
          <Cards />
        </Container>

        {/*  MODAL SHOW ON CARD RECEIVED!  */}
        <CardReceived
          isLoading={isBuying || isFetchingMetaData}
          cardData={cardMetaData}
        />
      </div>
    </>
  );
};

export default memo(CityPage, isEqual);
