import { useRouter } from "next/router";
import { memo } from "react";
import isEqual from "react-fast-compare";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import LoadingScreen from "./LoadingScreen";

const Layout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const loading = useLoadingScreen(false);
  const isPrivateBox = router.pathname.startsWith("/private");
  if (isPrivateBox) {
    return <>{children}</>;
  }
  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default memo(Layout, isEqual);
