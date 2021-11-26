import { memo } from "react";
import Navbar from "./Navbar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default memo(Layout);
