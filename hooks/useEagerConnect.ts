import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "../dapp/connectors";

export default function useEagerConnect() {
  const { activate, active } = useWeb3React<Web3Provider>();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          setTimeout(() => {
            activate(injected, undefined, true)
              .then((data) => {})
              .catch((err) => {
                setTried(true);
              });
          }, 0);
        } else {
          setTried(true);
        }
      });
    }
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
