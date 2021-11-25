import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import menus from "../dapp/menus";

type Props = {
  sidebarOpen?: boolean;
  closeSidebar?: () => void;
  showAdminMenu?: boolean;
};

const Sidebar: React.FC<Props> = ({ sidebarOpen, closeSidebar }) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`transition-all duration-500 absolute top-0 bottom-0 z-50 ${
        sidebarOpen ? "left-0" : "-left-64 md:left-0"
      } md:z-0`}
    >
      <div className="flex h-screen overflow-y-auto flex-col bg-white  w-64 px-4 border-r min-h-screen relative">
        <div className="h-16 flex items-center border-b">
          <button
            onClick={closeSidebar}
            className="absolute right-3 md:hidden text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
          >
            ICON LEFT
          </button>
          <Link href="/">LOGO</Link>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <nav className="text mt-4">
            {menus.map((menu) => {
              const { title, href } = menu;
              const isMatch = pathname === href;
              return (
                <Link key={href} href={href} passHref>
                  <a
                    className={`space-x-2 capitalize flex items-center px-4 my-5 py-2 ${
                      isMatch
                        ? "bg-primary text-white transition-colors duration-200 transform"
                        : "hover:bg-gray-200 text-primary"
                    } rounded-md`}
                  >
                    <Image
                      src={menu.icon}
                      height={20}
                      width={20}
                      className="fill-current text-white"
                      alt={`Icon ${title}`}
                    />
                    <span className="font-medium">{title}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
