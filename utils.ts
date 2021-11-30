import logger from "./lib/logger";
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

export const getTruncatedAddress = (address: string) => {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
};

export const getErrorMessage = (error: Error): string => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network. Please switch to the main BSC network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    logger.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
};

export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
  });
};

export const formatCountDown = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const daysString = days > 0 ? `${days.toString().padStart(2, "0")}` : "00";
  const hoursString = hours > 0 ? `${hours.toString().padStart(2, "0")}` : "00";
  const minutesString =
    minutes > 0 ? `${minutes.toString().padStart(2, "0")}` : "00";
  const secondsString =
    seconds > 0 ? `${seconds.toString().padStart(2, "0")}` : "00";
  return `${daysString}:${hoursString}:${minutesString}:${secondsString}`;
};
