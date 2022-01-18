import { useRouter } from "next/router";
import Connect from "../Common/Connect";
import Sidebar from "./Sidebar";

const AppLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  if (isHomePage) {
    return <>{children}</>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[296px,1fr] bg-[#171923]">
      <Sidebar />
      {children}
    </div>
  );
};

export default AppLayout;
