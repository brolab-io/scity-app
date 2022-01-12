import { NextPage } from "next";
import { memo } from "react";
import isEqual from "react-fast-compare";
import Container from "../../components/UI/Container";
import Image from "next/image";
import Link from "next/link";
import SvgChevronRight from "../../components/Icons/SvgChevronRight";

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

const NFTDetail: NextPage = () => {
  const index = Math.floor(Math.random() * 4);
  return (
    <div className="bg-[#171923] pt-16 min-h-screen">
      <Container className="px-4 pb-10 md:pb-12 lg:pb-16 pt-6 md:pt-10 lg:pt-14 space-y-6 lg:space-y-8 md:px-8 xl:px-4">
        <div className="flex font-[16px] font-medium">
          <Link href="/marketplace" passHref>
            <a className="text-[#718096] hover:text-white">Marketplace</a>
          </Link>
          <SvgChevronRight className="h-6 w-6" />
          <span className="text-white">#12 Torontoce</span>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mt-10 md:mt-12 lg:mt-14">
          {/* #################### Image & NFT Info ####################*/}
          <div className="col-span-2 bg-[#1A202C] rounded-[24px]">
            <div className="grid sm:grid-cols-2 p-4 md:p-6 lg:p-8 gap-8">
              <div
                className="relative aspect-[352/409] w-full items-center flex justify-center rounded-[16px]"
                style={bgStyles[index]}
              >
                <Image
                  quality={100}
                  className="absolute"
                  alt=""
                  src={images[index]}
                  height={242}
                  width={177}
                />
              </div>
              <div className="space-y-8">
                <h1 className="text-white font-semibold text-[32px]">#12 Toronto</h1>
                <div className="space-y-[19px]">
                  <div className="flex justify-between">
                    <span className="text-[#718096] text-[16px]">Par Value</span>
                    <span className="text-white text-[16px] font-medium">302.12 SCC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096] text-[16px]">Mining Efficiency</span>
                    <span className="text-white text-[16px] font-medium">200.45 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096] text-[16px]">Mining Power</span>
                    <span className="text-white text-[16px] font-medium">120 SCC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096] text-[16px]">Rarity</span>
                    <span className="text-white text-[16px] font-medium">N</span>
                  </div>
                  <div className="bg-[#2D3748] rounded-[16px] p-4 space-y-4">
                    <span className="text-[#A0AEC0]">Sale Price (SCC)</span>
                    <span className="text-[20px] text-white font-medium space-x-6 flex items-center">
                      <div className="flex items-center space-x-2">
                        <Image
                          quality={100}
                          src="/assets/images/scc.png"
                          alt="SCC"
                          height={32}
                          width={32}
                        />
                        <span>605.250</span>
                      </div>
                      <span className="text-[#A0AEC0] text-[16px]">~ $200.566</span>
                    </span>
                  </div>
                </div>
                <button className="rounded button button-magenta button-rounded w-full">
                  <span className="text-[12px] md:text-[14px] lg:text-[16px]">Connect Wallet</span>
                </button>
              </div>
            </div>
          </div>

          {/* #################### On-Chain Data ####################*/}
          <div className="bg-[#1A202C] col-span-2 lg:col-span-1 p-6 rounded-[24px] space-y-8">
            <h4 className="text-[24px] font-semibold text-white">On-Chain Data</h4>
            <div className="space-y-[19px]">
              <div className="flex justify-between">
                <span className="text-[#718096] text-[16px]">Owner</span>
                <span className="text-magenta text-[16px] font-medium">0x57CB...ea4a6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718096] text-[16px]">Contract Address</span>
                <span className="text-magenta text-[16px] font-medium">0x57CB...ea4a6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718096] text-[16px]">Token ID</span>
                <span className="text-white text-[16px] font-medium">#1223</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718096] text-[16px]">Asset Protocol</span>
                <span className="text-white text-[16px] font-medium">BSC721</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718096] text-[16px]">Asset Public Chain</span>
                <span className="text-white text-[16px] font-medium">BSC</span>
              </div>
            </div>
          </div>
        </div>
        {/* #################### Market Rules ####################*/}
        <div className="w-full p-6 border border-[#2D3748] rounded-[24px]">
          <h4 className="text-[24px] text-white font-semibold mb-4">Market Rules</h4>
          <div className="text-[#A0AEC0] text-[16px] space-y-2">
            <p>1. NFT can be purchased in the NFT market with SCC.</p>
            <p>
              2. After NFT is listed in the trading market, operations such as transfer and stake
              mining are not allowed.
            </p>
            <p>
              3. The market will charge 3% of the seller&#8217;s revenue as a service fee, of which
              50% is burned, 40% enter the SCC NFT Pool, and 10% is the developer&#8217;s revenue.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(NFTDetail, isEqual);
