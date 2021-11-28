import { memo } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default memo(Layout);
