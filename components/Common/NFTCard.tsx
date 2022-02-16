import { memo, ReactElement, useCallback, useMemo } from "react";
import isEqual from "react-fast-compare";
import Image from "next/image";
import Link from "next/link";
import styles from "./NFTCard.module.css";
import clsx from "clsx";

const images = [
  "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/ElSalvador_unj1az.png",
  "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/Rome_tvhg8q.png",
  "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/Hongkong_ie1zwg.png",
  "https://res.cloudinary.com/dcrbaasbt/image/upload/v1640017575/Toronto_uohpdi.png",
];

const RARE = {
  b: {
    background: "radial-gradient(50% 50% at 50% 50%, #AA75E4 0%, #6320AB 100%)",
  },
  a: {
    background: "radial-gradient(50% 50% at 50% 50%, #833EF1 0%, #491CB5 100%)",
  },
  r: {
    background: "radial-gradient(50% 50% at 50% 50%, #46B8C9 0%, #226771 100%)",
  },
  sr: {
    background: "radial-gradient(50% 50% at 50% 50%, #FBE9BC 0%, #F1B540 100%)",
  },
};

type InfoProps = {
  title: string;
  value: string | number;
};
export const CardBasicInfo: React.FC<InfoProps> = ({ title, value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-[14px] text-[#A0AEC0]">{title}</span>
      <span className="text-[16px] text-white font-semibold">{value}</span>
    </div>
  );
};

export const CardPriceInSCC: React.FC<Omit<InfoProps, "title">> = ({ value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-[18px] text-white">{value}</span>
      <span className="text-[14px] text-white font-medium space-x-2 flex items-center">
        <Image quality={100} src="/assets/images/scc.png" alt="SCC" height={24} width={24} />
        <span>SCC</span>
      </span>
    </div>
  );
};

export const CardPriceInfo: React.FC<InfoProps> = ({ title, value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-[14px] text-[#A0AEC0]">{title}</span>
      <span className="text-[16px] text-white font-semibold">
        {value} <span className="text-magenta">SCC</span>
      </span>
    </div>
  );
};

type Props = {
  href?: string;
  onClickSell?: (nft: NFT) => void;
  className?: string;
  metadata: LandNFT;
  CardHeader?: JSX.Element;
  CardFooter: JSX.Element;
  allowSell?: boolean;
  allowStake?: boolean;
  attributes?: Record<string, string | number>;
};

const NFTCard: React.FC<Props> = ({
  href,
  onClickSell,
  className,
  metadata,
  allowSell,
  allowStake,
  CardHeader,
  CardFooter,
  attributes,
}) => {
  const index = Math.floor(Math.random() * 4);

  const handleClickSell = useCallback(() => {
    if (onClickSell) {
      onClickSell({
        ...metadata,
        image: images[index],
      });
    }
  }, [onClickSell, index, metadata]);

  const Card = useCallback(() => {
    const rare = ((attributes?.rare as string | undefined)?.toLowerCase() ||
      "b") as keyof typeof RARE;
    return (
      <>
        <div
          className="relative aspect-[274/258] w-full items-center flex justify-center"
          style={RARE[rare]}
        >
          <div className="absolute left-2.5 top-2.5">
            <Image
              quality={100}
              alt=""
              src={`/assets/images/icons/rare-${rare}.png`}
              height={45}
              width={45}
            />
          </div>
          <div
            className={clsx(
              allowSell || allowStake
                ? "absolute inset-0 z-20 group hover:bg-black hover:bg-opacity-50 p-9 space-y-2 flex flex-col justify-center"
                : "hidden",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <button className="hidden w-full transition-all duration-300 ease-in-out rounded group-hover:flex button button-magenta button-rounded">
              <span className="text-[12px] md:text-[14px] lg:text-[16px]">Stake</span>
            </button>
            <button
              onClick={handleClickSell}
              className="hidden w-full transition-all duration-300 ease-in-out bg-white rounded group-hover:flex button button-rounded"
            >
              <span className="text-[12px] md:text-[14px] lg:text-[16px] text-magenta">Sell</span>
            </button>
          </div>
          <Image
            quality={100}
            className="absolute"
            alt=""
            src={images[index]}
            height={242}
            width={177}
          />
        </div>

        <div className="p-4 space-y-2">
          <h6 className="font-semibold text-white">{metadata?.name || "#0 Card Name"}</h6>
          {CardHeader}
        </div>
        <div className={styles.subtract}></div>
        <div className="p-4 space-y-2">{CardFooter}</div>
      </>
    );
  }, [metadata, allowSell, allowStake, handleClickSell, index, CardHeader, CardFooter, attributes]);

  if (!href) {
    return (
      <div className="rounded-lg bg-[#1A202C] overflow-hidden">
        <Card />
      </div>
    );
  }

  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          "rounded-lg bg-[#1A202C] overflow-hidden cursor-pointer",
          "hover:-translate-y-1 duration-200",
          className
        )}
      >
        <Card />
      </a>
    </Link>
  );
};

export default memo(NFTCard, isEqual);
