import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Clickable from "./Clickable";
import Loading from "./Loading";

type Props = {
  cardData;
  isLoading?: boolean;
};

const CardReceived: React.FC<Props> = ({ cardData, isLoading }) => {
  const [cardMetaData, setCardMetaData] = useState<any>(cardData);
  const data = useMemo(() => {
    const obj: Record<string, string | number> = {};
    for (const attribute of cardMetaData?.attributes ?? []) {
      obj[attribute.trait_type] = attribute.value;
    }
    return obj;
  }, [cardMetaData]);

  useEffect(() => {
    setCardMetaData(cardData);
  }, [cardData]);

  const onClickClose = useCallback(() => {
    setCardMetaData(undefined);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!cardMetaData) {
    return null;
  }

  return (
    <div
      role="presentation"
      onClick={onClickClose}
      className="fixed inset-0 z-40 bg-gray-800 bg-opacity-70 flex items-center justify-center transform duration-500 cursor-default"
    >
      <div className="bg-white shadow-xl  rounded-lg select-none">
        <div className="w-80 rounded-xl p-6 space-y-1.5">
          <Image
            width={247 * 2}
            height={311 * 2}
            alt="card"
            src="/images/card.png"
          />
          <div className="py-1 mt-4 md:mt-2 lg:mt-1 text-center">
            <span className="lg:text-lg font-semibold text-black">
              {data.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">Rare</span>
            <span className="font-bold">S</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">Mining Efficiency</span>
            <span className="font-bold">{data.miningEfficiency}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">Mining Power</span>
            <span className="font-bold">{data.miningPower} SCC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReceived;
