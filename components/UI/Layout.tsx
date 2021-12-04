import { useRouter } from "next/router";
import { memo } from "react";
import isEqual from "react-fast-compare";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Layout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const isPrivateBox = router.pathname.includes("/private-box");
  if (isPrivateBox) {
    return <>{children}</>;
  }
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default memo(Layout, isEqual);
