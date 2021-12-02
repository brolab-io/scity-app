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
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { activatingConnector, setActivatingConnector, triedEager } = useAppContext();
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
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </>
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
