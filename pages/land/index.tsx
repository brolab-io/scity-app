import { NextPage } from "next";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import Image from "next/image";
import { ICityData } from "../../lib/types";
import Countdown from "../../components/Countdown";
import Button from "../../components/Button";
import useInfoOpenArea from "../../hooks/useInfoOpenArea";
import useBuyLand from "../../hooks/useBuyLand";
import Cards from "../../components/Cards";
import { useQuery } from "react-query";
import { getNFTLandMetaData, getOpenedCities } from "../../lib/api";
import CardReceived from "../../components/CardRecieved";
import Clickable from "../../components/Clickable";
import isEqual from "react-fast-compare";

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

  const bg1Style = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/bg-2.svg)`,
    }),
    []
  );

  useEffect(() => {
    if (cardMetaData) {
      console.log(cardMetaData);
    }
  }, [cardMetaData]);

  const isOutOfTime = new Date().getTime() > new Date(endTime * 1000).getTime();
  const isOutOfStock = currentQuantity >= limit;
  const shouldEnableBuy = !(
    isLoading ||
    isProcessing ||
    isOutOfTime ||
    isOutOfStock
  );

  return (
    <div className="bg-black pt-20">
      <div
        style={bg1Style}
        className="md:p-4 lg:p-10 md:py-6 lg:y-10 space-y-8"
      >
        <Container>
          <div className="md:rounded-md lg:rounded-lg xl:rounded-xl bg-dark-gray bg-opacity-80 p-6 lg:p-8">
            <div className="grid gap-x-4 gap-y-8 lg:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {cities.map((city) => (
                  <Clickable
                    onClick={() => setSelectedCity(city)}
                    className={`bg-radial-gradient-purple p-3 md:p-4 lg:p-5 xl:p-6 rounded-xl ${
                      selectedCity?.id === city.id
                        ? "bg-opacity-100 ring"
                        : "bg-opacity-50"
                    }`}
                    key={city.id}
                  >
                    <div className="p-4 cursor-pointer">
                      <Image
                        draggable={false}
                        className={`transform ease-in-out duration-300 ${
                          selectedCity?.id === city.id
                            ? "scale-110"
                            : "hover:scale-110"
                        }`}
                        src={city.image}
                        height={600}
                        width={600}
                        alt={city.name}
                      />
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white px-4 rounded-lg">
                        <span className="text-gradient font-semibold bg-gradient-to-bl text-sm">
                          {city.name}
                        </span>
                      </div>
                    </div>
                  </Clickable>
                ))}
              </div>
              {/* 2ND COL */}
              <div className="flex flex-col justify-center px-0 lg:px-6 space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7">
                <div className="flex">
                  <h1 className="text-3xl text-white uppercase">
                    {selectedCity?.name}
                  </h1>
                  <div className="flex items-center justify-center ml-2 rounded-xl bg-gradient bg-gradient-to-b p-2 -mt-2 h-7 w-12">
                    <span className="font-semibold text-white text-sm">
                      HOT
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-light-gray">
                    Remaining Amount:{" "}
                    <span className="text-gradient bg-gradient-to-bl">
                      {(limit ?? 0) - (currentQuantity ?? 0)}
                    </span>
                    /
                    <span className="text-white">
                      {(limit || selectedCity?.numberOfSlots) ?? 0}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-light-gray">Ended:</span>
                  <div className="flex items-center bg-dark-gray rounded-xl px-3 py-1 space-x-2">
                    <Image
                      src="/images/icons/fire.svg"
                      width={16}
                      height={16}
                      alt="fire"
                    />
                    <Countdown
                      className="text-white text-sm font-medium"
                      endDate={new Date(endTime * 1000)}
                    />
                  </div>
                </div>
                <div className="bg-dark-gray p-4 rounded-xl">
                  <span className="text-light-gray">Price</span>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/images/icons/bnb.svg"
                      width={26}
                      height={26}
                      alt="fire"
                    />
                    <span className="text-2xl font-medium text-white">
                      {price}
                    </span>
                    <span className="text-gradient bg-gradient-to-bl">
                      ~ $6.6
                    </span>
                  </div>
                </div>
                <Button
                  disabled={!shouldEnableBuy}
                  isLoading={isBuying}
                  onClick={onClickBuyNow}
                  className="text-gray-500"
                >
                  {isOutOfStock
                    ? "Out of stock"
                    : isOutOfTime
                    ? "Out of time"
                    : "Buy now"}
                </Button>
                <div className="bg-dark-gray p-4 rounded-xl space-y-2">
                  <span className="text-white">Shop Rule:</span>
                  <div className="space-y-1">
                    <p className="text-light-gray text-sm">
                      1. You can buy BOX with SCC, and get a CITY CARD randomly
                      after purchase;
                    </p>
                    <p className="text-light-gray text-sm">
                      2. The higher rarity box, the higher CITY CARD rare. There
                      are four level of rarity: B - A - R - SR.
                    </p>
                    <p className="text-light-gray text-sm">
                      3. The higher CITY CARD rare, the higher Hashrate, meaning
                      the higher income you’ll receive when stake these card
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="pb-10 pt-20">
          <Cards />
        </div>
      </Container>
      <CardReceived
        isLoading={isBuying || isFetchingMetaData}
        cardData={cardMetaData}
      />
    </div>
  );
};

export default memo(CityPage, isEqual);
