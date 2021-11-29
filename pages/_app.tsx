import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../lib/getLibrary";
import useInactiveListener from "../hooks/useInactiveListener";
import { useAppContext, AppContextProvider } from "../components/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getErrorMessage } from "../utils";
import type { Web3Provider } from "@ethersproject/providers";
import Layout from "../components/UI/Layout";
import SEO from "../next-seo.config.json";
import { DefaultSeo } from "next-seo";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { activatingConnector, setActivatingConnector, triedEager } =
    useAppContext();
  const { error, deactivate, connector } = useWeb3React<Web3Provider>();

  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (error) {
      console.error(error);
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
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default function App(props: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <MyApp {...props} />
          <ToastContainer pauseOnFocusLoss={false} position="top-center" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppContextProvider>
    </Web3ReactProvider>
  );
}
