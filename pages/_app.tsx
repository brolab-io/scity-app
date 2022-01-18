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
import { getErrorMessage } from "../lib/utils";
import type { Web3Provider } from "@ethersproject/providers";
import LandingLayout from "../components/UI/LandingLayout";
import SEO from "../next-seo.config.json";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import EtherContextProvider from "../components/EtherContext";

import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import AppLayout from "../components/UI/AppLayout";

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

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
      <DefaultSeo {...SEO} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtag.GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtag.GTM_ID}');
          `,
        }}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <EtherContextProvider>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <MyApp {...props} />
            <ToastContainer pauseOnFocusLoss={false} position="top-center" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AppContextProvider>
      </EtherContextProvider>
    </Web3ReactProvider>
  );
}
