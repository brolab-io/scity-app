import { memo, useMemo } from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Image from "next/image";
import Countdown from "../UI/Countdown";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useRouter } from "next/router";
import useConnectWallet from "../../hooks/useConnectWallet";

type Props = {
  priceInBSC: string;
  priceInUSD: string;
  shopRules: string;
  endTime?: Date;
  slotsRemaining?: number;
  numberOfSlots?: number;
  name: string;
  ImageSection: React.FC;
  buyEnabled: boolean;
  isBuying?: boolean;
  onClickBuy: () => void;
  buttonTitle: string;
  showEndTime?: boolean;
};

const BuySection: React.FC<Props> = ({
  priceInBSC,
  priceInUSD,
  shopRules,
  buttonTitle,
  slotsRemaining,
  endTime,
  numberOfSlots,
  name,
  ImageSection,
  buyEnabled,
  isBuying,
  onClickBuy,
  showEndTime,
}) => {
  const bg1Style = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/bg-2.svg)`,
    }),
    []
  );

  const { active } = useWeb3React<Web3Provider>();
  const { connectWallet } = useConnectWallet();

  return (
    <div style={bg1Style} className="space-y-8 md:p-4 lg:p-10 md:py-6 lg:y-10">
      <Container>
        <div className="p-6 md:rounded-md lg:rounded-lg xl:rounded-xl bg-dark-gray bg-opacity-80 lg:p-8">
          <div className="grid gap-x-4 gap-y-8 lg:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
            <ImageSection />
            {/* 2ND COL */}
            <div className="flex flex-col justify-center px-0 space-y-4 lg:px-6 md:space-y-5 lg:space-y-6 xl:space-y-7">
              <div className="flex">
                <h1 className="text-3xl text-white uppercase">{name}</h1>
                <div className="flex items-center justify-center w-12 p-2 ml-2 -mt-2 rounded-xl bg-gradient bg-gradient-to-b h-7">
                  <span className="text-sm font-semibold text-white">HOT</span>
                </div>
              </div>
              <div>
                <span className="text-light-gray">
                  {numberOfSlots ? "Remaining Amount" : "Total sold boxes"}:{" "}
                  <span className="text-gradient bg-gradient-to-bl">{slotsRemaining}</span>
                  {numberOfSlots ? (
                    <>
                      /<span className="text-white">{numberOfSlots}</span>
                    </>
                  ) : null}
                </span>
              </div>
              {showEndTime === false ? null : (
                <div className="flex items-center space-x-4">
                  <span className="text-light-gray">Ended:</span>
                  <div className="flex items-center px-3 py-1 space-x-2 bg-dark-gray rounded-xl">
                    <Image src="/images/icons/fire.svg" width={16} height={16} alt="fire" />
                    <Countdown className="text-sm font-medium text-white" endDate={endTime} />
                  </div>
                </div>
              )}
              <div className="p-4 bg-dark-gray rounded-xl">
                <span className="text-light-gray">Price</span>
                <div className="flex items-center space-x-2">
                  <Image src="/images/icons/bnb.svg" width={26} height={26} alt="fire" />
                  <span className="text-2xl font-medium text-white">{priceInBSC}</span>
                  <span className="text-gradient bg-gradient-to-bl">~ ${priceInUSD}</span>
                </div>
              </div>
              <Button
                className="py-2.5 rounded-lg"
                disabled={!buyEnabled || (buyEnabled && !active)}
                isLoading={isBuying}
                onClick={active ? onClickBuy : connectWallet}
              >
                <span className="text-lg">{active ? buttonTitle : "Connect Wallet"}</span>
              </Button>
              <div className="p-4 space-y-2 bg-dark-gray rounded-xl">
                <span className="text-white">Shop Rule:</span>
                <div className="space-y-1">
                  {shopRules.split("\n").map((rule, index) => (
                    <p key={index} className="text-sm text-light-gray">
                      {rule}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(BuySection);
