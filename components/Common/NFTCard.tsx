import { memo, useCallback } from "react";
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

const bgStyles = [
  {
    background: "radial-gradient(50% 50% at 50% 50%, #FBE9BC 0%, #F1B540 100%)",
  },
  {
    background: "radial-gradient(50% 50% at 50% 50%, #833EF1 0%, #491CB5 100%)",
  },
  {
    background: "radial-gradient(50% 50% at 50% 50%, #46B8C9 0%, #226771 100%)",
  },
  {
    background: "radial-gradient(50% 50% at 50% 50%, #AA75E4 0%, #6320AB 100%)",
  },
];

const MiningEfficiency = () => {
  return (
    <div className="flex justify-between">
      <span className="text-[14px] text-[#A0AEC0]">Mining Efficiency</span>
      <span className="text-[16px] text-white font-semibold">130%</span>
    </div>
  );
};

const MiningPower = () => {
  return (
    <div className="flex justify-between">
      <span className="text-[14px] text-[#A0AEC0]">Mining Power</span>
      <span className="text-[16px] text-white font-semibold">
        50 <span className="text-magenta">SCC</span>
      </span>
    </div>
  );
};

const SalePrice = () => {
  return (
    <div className="flex justify-between">
      <span className="text-[14px] text-[#A0AEC0]">Sale Price</span>
      <span className="text-[16px] text-white font-semibold">~ $2.566</span>
    </div>
  );
};

const PriceInSCC = () => {
  return (
    <div className="flex justify-between">
      <span className="text-[18px] text-white">6.250</span>
      <span className="text-[14px] text-white font-medium space-x-2 flex items-center">
        <Image quality={100} src="/assets/images/scc.png" alt="SCC" height={24} width={24} />
        <span>SCC</span>
      </span>
    </div>
  );
};

type Props = {
  sale?: boolean;
  href?: string;
  onClickSell?: (nft: NFT) => void;
};

const NFTCard: React.FC<Props> = ({ sale, href = "#", onClickSell }) => {
  const index = Math.floor(Math.random() * 4);

  const handleClickSell = useCallback(() => {
    if (onClickSell) {
      onClickSell({
        image: images[index],
      });
    }
  }, [onClickSell, index]);

  return (
    <Link href={href} passHref>
      <a className="rounded-lg bg-[#1A202C] overflow-hidden cursor-pointer">
        <div
          className="relative aspect-[274/258] w-full items-center flex justify-center"
          style={bgStyles[index]}
        >
          <div className="absolute left-2.5 top-2.5">
            <Image
              quality={100}
              alt=""
              src="/assets/images/icons/rareN.png"
              height={45}
              width={45}
            />
          </div>
          <div
            className={clsx(
              sale
                ? "hidden"
                : "absolute inset-0 z-20 group hover:bg-black hover:bg-opacity-50 p-9 space-y-2 flex flex-col justify-center",
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
          <h6 className="font-semibold text-white">#12 El Salvador</h6>
          {sale ? (
            <>
              <MiningEfficiency />
              <MiningPower />
            </>
          ) : null}
        </div>
        <div className={styles.subtract}></div>
        <div className="p-4 space-y-2">
          {sale ? (
            <>
              <SalePrice />
              <PriceInSCC />
            </>
          ) : (
            <>
              <MiningEfficiency />
              <MiningPower />
            </>
          )}
        </div>
      </a>
    </Link>
  );
};
export default memo(NFTCard, isEqual);
