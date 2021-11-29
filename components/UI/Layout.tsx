import { memo } from "react";
import isEqual from "react-fast-compare";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default memo(Layout, isEqual);
