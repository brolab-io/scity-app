import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

export default function useLoadingScreen(initialState: boolean) {
  const { pathname } = useRouter();
  const isLandingPage = pathname === "/";
  const [loading, setLoading] = useState(isLandingPage || initialState);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log("Loading screen: start", url);
      url !== Router.asPath && setLoading(true);
    };
    const handleComplete = (url: string) => {
      console.log("Loading screen: complete", url);
      url === Router.asPath && setTimeout(() => setLoading(false), 500);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  });

  useEffect(() => {
    if (isLandingPage && loading) {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [isLandingPage, loading]);

  useEffect(() => {
    if (typeof window !== "undefined" && loading) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);
  return loading;
}
