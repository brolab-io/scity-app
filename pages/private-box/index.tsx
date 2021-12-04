import { NextPage } from "next";
import React, { ChangeEventHandler, memo, useCallback, useMemo, useState } from "react";
import isEqual from "react-fast-compare";

// Components
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useConnectWallet from "../../hooks/useConnectWallet";
import Countdown from "../../components/UI/Countdown";
import Button from "../../components/UI/Button";
import PrivateBoxTransactionHistory from "../../components/PrivateBox/TransactionHistory";
import PrivateBoxConnectWallet from "../../components/PrivateBox/ConnectWallet";
import { isEmail } from "../../utils";
import { useRouter } from "next/router";
import usePrivateBoxContract from "../../hooks/usePrivateBoxContract";
import { ethers } from "ethers";
import Loading from "../../components/UI/Loading";

const PrivateBoxPage: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    telegram: "",
  });

  const ref = Array.isArray(router.query.ref) ? router.query.ref[0] : router.query.ref;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const bg1Style = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/bg-2.svg)`,
    }),
    []
  );
  const { info, isBuying, buyPrivateBox, isApprovingBUSD } = usePrivateBoxContract();
  const { price, limit, endTime, totalSupply } = info;

  const { active } = useWeb3React<Web3Provider>();
  const { connectWallet } = useConnectWallet();
  const onClickBuy = useCallback(() => {
    if (!ref) {
      return;
    }
    buyPrivateBox(formData.email, formData.telegram, ref);
  }, [buyPrivateBox, formData.email, formData.telegram, ref]);

  const buttonTitle = active ? "Buy Now" : "Connect Wallet";

  const ImageSection = useCallback(
    () => (
      <div className="p-10 md:p-16 lg:p-20 xl:p-24 rounded-xl bg-radial-gradient-purple">
        <Image src="/images/icons/box.png" height={456} width={426} alt="Box" />
      </div>
    ),
    []
  );

  const isValidEmail = isEmail(formData.email);
  const isVaildTelegramID = formData.telegram.length > 5;
  const shouldDisableButton = active && (!(isValidEmail && isVaildTelegramID) || isBuying || !ref);

  return (
    <>
      <div
        style={bg1Style}
        className="relative flex flex-col w-screen h-screen py-6 space-y-8 overflow-y-scroll bg-black md:p-4 lg:p-10 lg:py-10"
      >
        <PrivateBoxConnectWallet />
        <div className="max-w-screen-lg mx-auto">
          <div className="p-6 rounded-lg xl:rounded-xl bg-dark-gray bg-opacity-80 lg:p-8">
            <div className="grid gap-x-4 gap-y-8 lg:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
              <ImageSection />
              {/* 2ND COL */}
              <div className="flex flex-col justify-center px-0 space-y-4">
                <div className="flex">
                  <h1 className="text-2xl text-white uppercase lg:text-3xl">PRIVATE BOX</h1>
                  <div className="flex items-center justify-center w-16 h-6 p-2 ml-2 -mt-2 lg:w-20 rounded-xl bg-gradient bg-gradient-to-b lg:h-7">
                    <span className="text-xs font-semibold text-white lg:text-sm">LIMITED</span>
                  </div>
                </div>
                <div className="">
                  <div className="space-x-2 text-light-gray">
                    <span>Remaining Amount:</span>
                    <span className="text-gradient bg-gradient-to-bl">
                      {limit - totalSupply}
                      <span className="text-white">/{limit || 0}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-light-gray">Ended:</span>
                  <div className="flex items-center px-3 py-1 space-x-2 bg-dark-gray rounded-xl">
                    <Image src="/images/icons/fire.svg" width={16} height={16} alt="fire" />
                    <Countdown
                      className="text-sm font-medium text-white"
                      endDate={new Date(endTime * 1000)}
                    />
                  </div>
                </div>
                <div className="p-4 bg-dark-gray rounded-xl">
                  <span className="text-light-gray">Price</span>
                  <div className="flex items-center space-x-2">
                    <Image src="/images/icons/bnb.svg" width={26} height={26} alt="fire" />
                    <span className="text-2xl font-medium text-white">
                      {ethers.utils.formatEther(price)} BUSD
                    </span>
                    <span className="text-gradient bg-gradient-to-bl">
                      ~ ${ethers.utils.formatEther(price)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-white" htmlFor="email">
                      Email
                    </label>
                    {!isValidEmail ? (
                      <span className="text-sm text-red-500">Email is not vaild</span>
                    ) : null}
                  </div>
                  <input
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Type your email"
                    className="w-full px-4 py-2 lg:py-2.5 text-white bg-gray-500 bg-opacity-50 rounded outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-white" htmlFor="telegram">
                      Telegram ID
                    </label>
                    {!isVaildTelegramID ? (
                      <span className="text-sm text-red-500">Telegram ID is not valid</span>
                    ) : null}
                  </div>
                  <input
                    id="telegram"
                    name="telegram"
                    value={formData.telegram}
                    required
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Type your Telegram ID"
                    className="w-full px-4 py-2 lg:py-2.5 text-white bg-gray-500 bg-opacity-50 rounded outline-none"
                  />
                </div>
                <Button
                  className="py-2 lg:py-2.5 rounded-lg"
                  disabled={shouldDisableButton}
                  isLoading={isApprovingBUSD || isBuying}
                  onClick={active ? onClickBuy : connectWallet}
                >
                  <span className="text-lg">{buttonTitle}</span>
                </Button>
              </div>
            </div>
          </div>
          <PrivateBoxTransactionHistory />
        </div>
      </div>
      {isApprovingBUSD || isBuying || isBuying ? <Loading /> : null}
    </>
  );
};

export default memo(PrivateBoxPage, isEqual);
