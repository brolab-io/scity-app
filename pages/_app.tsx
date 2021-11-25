import "../styles/globals.css";
import fetcher from "../lib/fetcher";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../lib/getLibrary";
import useInactiveListener from "../hooks/useInactiveListener";
import { useAppContext, AppContextProvider } from "../components/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getErrorMessage } from "../utils";
import type { Web3Provider } from "@ethersproject/providers";
import type { SWRConfiguration } from "swr";
import Layout from "../components/Layout";

const swrOptions: SWRConfiguration = {
  fetcher,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { activatingConnector, setActivatingConnector, triedEager } =
    useAppContext();
  const { error, deactivate, connector } = useWeb3React<Web3Provider>();

  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
      deactivate();
    }
  }, [deactivate, error]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector, setActivatingConnector]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default function App(props: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContextProvider>
        <SWRConfig value={swrOptions}>
          <MyApp {...props} />
          <ToastContainer pauseOnFocusLoss={false} position="top-center" />
        </SWRConfig>
      </AppContextProvider>
    </Web3ReactProvider>
  );
}
