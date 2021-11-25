import { memo } from "react";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="grid grid-cols-primary lg:grid-cols-primary-lg">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="max-w-screen-xl mx-auto px-8">
          <Header />
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(Layout);
