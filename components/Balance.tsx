import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export default function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = useState<number | null>();

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div className="flex items-center space-x-1 px-4 py-2">
      <span className="font-semibold text-sm">
        {/* {balance === null ? "Error" : balance ? `${formatEther(balance)}` : ""} */}
        My NFT: 0
      </span>
    </div>
  );
}
