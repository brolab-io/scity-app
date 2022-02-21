import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Connect.module.css";
import clsx from "clsx";
import LoadingIcon from "../UI/LoadingIcon";
import { useNearContext } from "../NearContext";

const Connect: React.FC = () => {
  const { signIn } = useNearContext();
  const [isLoading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    isLoading && signIn();
  }, [isLoading, signIn]);

  return (
    <button
      // isLoading={activating}
      onClick={handleClick}
      className={clsx(
        styles.connect,
        "text-sm text-white px-6 py-2.5 rounded-full flex items-center space-x-3",
        "hover:opacity-80 duration-200",
        "disabled:opacity-60 duration-200 "
      )}
    >
      {isLoading ? (
        <LoadingIcon className="w-4 h-4" />
      ) : (
        <Image src="/images/icons/wallet.svg" width={16} height={16} alt="wallet" />
      )}
      <span className="whitespace-nowrap">Connect Wallet</span>
    </button>
  );
};

export default Connect;
