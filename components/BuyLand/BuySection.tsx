import { memo, useCallback, useMemo } from "react";
import { ICityData } from "../../lib/types";
import Clickable from "../UI/Clickable";
import Image from "next/image";
import isEqual from "react-fast-compare";
import BuySection from "../Common/BuySection";
import { useRouter } from "next/router";

type Props = {
  selectedCity?: ICityData | null;
  currentQuantity?: number;
  endTime?: Date;
  cities: ICityData[];
  setSelectedCity: React.Dispatch<React.SetStateAction<ICityData | undefined | null>>;
  price?: string;
  limit?: number;
  isProcessing?: boolean;
  onClickBuyNow: () => void;
};

const BuyLandBuySection: React.FC<Props> = ({
  selectedCity,
  setSelectedCity,
  isProcessing,
  currentQuantity = 0,
  endTime,
  cities,
  price = "0",
  limit = 0,
  onClickBuyNow,
}) => {
  const isOutOfTime = new Date().getTime() > (endTime || new Date()).getTime();
  const isOutOfStock = currentQuantity >= limit;
  const shouldDisableBuy = isProcessing || isOutOfTime || isOutOfStock;

  const router = useRouter();

  const onClickSelectCity = useCallback(
    (city) => {
      setSelectedCity(city);
      router.push(`/land/${city.slug}`, undefined, { shallow: true });
    },
    [router, setSelectedCity]
  );

  const ImageSection = useCallback(
    () => (
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {cities.map((city) => (
          <Clickable
            onClick={() => onClickSelectCity(city)}
            className={`bg-radial-gradient-purple p-3 md:p-4 lg:p-5 xl:p-6 rounded-xl ${
              selectedCity?.id === city.id ? "bg-opacity-100 ring" : "bg-opacity-50"
            }`}
            key={city.id}
          >
            <div className="p-4 cursor-pointer">
              <Image
                draggable={false}
                className={`transform ease-in-out duration-300 ${
                  selectedCity?.id === city.id ? "scale-110" : "hover:scale-110"
                }`}
                src={city.image}
                height={600}
                width={600}
                alt={city.name}
              />
            </div>
            <div className="flex justify-center">
              <div className="px-4 bg-white rounded-lg">
                <span className="text-sm font-semibold text-gradient bg-gradient-to-bl">
                  {city.name}
                </span>
              </div>
            </div>
          </Clickable>
        ))}
      </div>
    ),
    [cities, onClickSelectCity, selectedCity?.id]
  );

  const buttonTitle = isOutOfStock ? "Out of stock" : isOutOfTime ? "Out of time" : "Buy now";

  return (
    <BuySection
      ImageSection={ImageSection}
      slotsRemaining={limit - (currentQuantity ?? selectedCity?.numberOfSlots ?? 0)}
      endTime={endTime}
      numberOfSlots={selectedCity?.numberOfSlots}
      buttonTitle={buttonTitle}
      buyEnabled={!shouldDisableBuy}
      isBuying={isProcessing}
      name={selectedCity?.name || ""}
      onClickBuy={onClickBuyNow}
      priceInBSC={price}
      priceInUSD={"6.6"}
      shopRules={`1. You can buy BOX with SCC, and get a CITY CARD randomly after purchase;\n2. The higher rarity box, the higher CITY CARD rare. There are four level of rarity: B - A - R - SR.\n3. The higher CITY CARD rare, the higher Hashrate, meaning the higher income you’ll receive when stake these card`}
    />
  );
};

export default memo(BuyLandBuySection, isEqual);
