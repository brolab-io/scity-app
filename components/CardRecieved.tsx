import { useCallback, useEffect, useMemo, useState } from "react";
import { ICardData } from "../lib/types";
import Image from "next/image";
import ReactCardFlip from "react-card-flip";
import LoadingIcon from "./LoadingIcon";

type Props = {
  cardData?: ICardData;
  isLoading?: boolean;
};

const CardReceived: React.FC<Props> = ({ cardData, isLoading }) => {
  const [cardMetaData, setCardMetaData] = useState<ICardData | undefined>(
    cardData
  );

  useEffect(() => {
    setCardMetaData(cardData);
  }, [cardData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCardMetaData({
        attributes: [
          {
            trait_type: "name",
            value: "Tokyo #1",
          },
          {
            trait_type: "city",
            value: "Tokyo",
          },
          {
            trait_type: "location",
            value: "0,0",
          },
          {
            trait_type: "rare",
            value: "R",
          },
          {
            trait_type: "miningPower",
            value: 56,
          },
          {
            trait_type: "miningEfficiency",
            value: 110,
          },
        ],

        hash: "15732f1db39d49ead31930a200ace1dc84cb36478bd515684c44e70894a14499",
        name: "Tokyo #1",
        description: null,
        image:
          "https://res.cloudinary.com/dcrbaasbt/image/upload/v1637838193/Group_332_nroa32.png",
        ownerAddress: null,
      });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  const onClickClose = useCallback(() => {
    setCardMetaData(undefined);
  }, []);

  const data = useMemo(() => {
    const obj: Record<string, string | number> = {};
    for (const attribute of cardMetaData?.attributes ?? []) {
      obj[attribute.trait_type] = attribute.value;
    }
    return obj;
  }, [cardMetaData]);

  if (!cardMetaData && !isLoading) {
    return null;
  }

  return (
    <div
      role="presentation"
      onClick={onClickClose}
      className="fixed inset-0 z-40 bg-gray-800 bg-opacity-70 flex items-center justify-center transform duration-500 cursor-default"
    >
      <div className="bg-white rounded-xl select-none">
        <div className="w-80 p-6 space-y-1.5">
          <div className="relative">
            {isLoading ? (
              <div className="absolute flex items-center justify-center inset-0  rounded-xl bg-opacity-70 z-10">
                <LoadingIcon className="h-8 w-8 text-white" />
              </div>
            ) : null}
            <ReactCardFlip isFlipped={isLoading}>
              <Image
                width={247 * 2}
                height={311 * 2}
                alt="card"
                src={"/images/card.png"}
              />
              <Image
                width={247 * 2}
                height={311 * 2}
                alt="card"
                src={"/images/card-back.png"}
              />
            </ReactCardFlip>
          </div>
          <div className="py-1 mt-4 md:mt-2 lg:mt-1 flex justify-center">
            <span className="lg:text-lg font-semibold text-black">
              {data?.name ?? "---"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">Rare</span>
            <span className="font-bold">{data?.rare ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">Mining Efficiency</span>
            <span className="font-bold">
              {data?.miningEfficiency ?? "--"} %
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-gray">Mining Power</span>
            <span className="font-bold ">{data?.miningPower ?? "--"} SCC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReceived;
