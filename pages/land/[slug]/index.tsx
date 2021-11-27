import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import useSWR from "swr";
import Container from "../../../components/Container";
import Loading from "../../../components/Loading";
import fetcher from "../../../lib/fetcher";
import Image from "next/image";
import { ICityData } from "../../../lib/types";
import Countdown from "../../../components/Countdown";
import Button from "../../../components/Button";
import useInfoOpenArea from "../../../hooks/useInfoOpenArea";
import useBuyLand from "../../../hooks/useBuyLand";
import Cards from "../../../components/Cards";

const CityPage: NextPage = () => {
  const router = useRouter();

  const slug = Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug;

  const { data, error } = useSWR(
    slug ? `/api/cities/${slug}` : null,
    slug ? fetcher : null
  );

  const city = data as ICityData | undefined;

  const { price, limit, endTime, isLoading, currentQuantity, reload } =
    useInfoOpenArea(city?.id);

  const { buy, isBuying } = useBuyLand(city?.id, {
    onSuccess: reload,
  });

  const isFetching = !data && !error;

  const onClickBuyNow = useCallback(() => {
    buy(price);
  }, [buy, price]);

  const bg1Style = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/bg-2.svg)`,
    }),
    []
  );

  if (isFetching) {
    return <Loading />;
  }

  const isOutOfTime = new Date().getTime() > new Date(endTime * 1000).getTime();
  const isOutOfStock = currentQuantity >= limit;
  const shouldEnableBuy = !(
    isLoading ||
    isBuying ||
    isOutOfTime ||
    isOutOfStock
  );

  return (
    <div className="bg-black">
      <div
        style={bg1Style}
        className="md:p-4 lg:p-10 md:pt-6 lg:pt-20 space-y-8"
      >
        <Container>
          <div className="md:rounded-md lg:rounded-lg xl:rounded-xl bg-dark-gray bg-opacity-80 p-6 lg:p-10">
            <div className="grid gap-x-4 gap-y-8 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <Image
                    key={i}
                    src="/images/mock.png"
                    height={600}
                    width={600}
                    alt="mock"
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center px-0 lg:px-6 space-y-4">
                <div className="flex">
                  <h1 className="text-3xl text-white">{city?.name}</h1>
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
                    /<span className="text-white">{limit ?? 0}</span>
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
    </div>
  );
};

export default CityPage;
