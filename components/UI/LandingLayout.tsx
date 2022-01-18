import { useRouter } from "next/router";
import { memo } from "react";
import isEqual from "react-fast-compare";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import LoadingScreen from "./LoadingScreen";

const LandingLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const loading = useLoadingScreen(false);
  const isPrivateBox = router.pathname.startsWith("/private");
  if (isPrivateBox) {
    return <>{children}</>;
  }
  return (
    <div className="relative">
      {loading && <LoadingScreen />}
      <main>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default memo(LandingLayout, isEqual);
