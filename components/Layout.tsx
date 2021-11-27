import { memo } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default memo(Layout);
