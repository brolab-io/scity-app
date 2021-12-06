import Link from "next/link";
import Clickable from "../UI/Clickable";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import ConnectWalletBlock from "./ConnectWalletBlock";
import ConnectWalletBlockMobile from "./ConnectWalletBlockMobile";

const navigationMenus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Buy Land",
    href: "/land",
  },
  {
    title: "Buy Box",
    href: "/box",
  },
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Comunity",
    href: "/comunity",
  },
  {
    title: "Pages",
    href: "/pages",
  },
  {
    title: "Whitepaper",
    href: "https://whitepaper.scity.games",
    target: "_blank",
  },
];

const Navbar: React.FC = () => {
  const { pathname, events } = useRouter();
  const [isVisible, setVisible] = useState(false);

  const toggle = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const onRouterChange = () => setVisible(false);
    events.on("routeChangeStart", onRouterChange);
    return () => {
      events.off("routeChangeStart", onRouterChange);
    };
  }, [events]);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 h-16 bg-black border-b border-gray-800 lg:px-4">
      <div className="items-center justify-between w-full h-full px-4 lg:flex">
        {/* LOGO  */}
        <div className="flex items-center justify-between w-full lg:w-72">
          <div className="flex items-center">
            <Clickable className="mr-2 lg:hidden" onClick={toggle}>
              <svg
                className="w-10 h-10 text-white fill-current"
                height="32px"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
              </svg>
            </Clickable>
            <Logo />
          </div>
          <div className="lg:hidden">
            <ConnectWalletBlockMobile />
          </div>
        </div>

        {/* NAVIGATION */}
        <NavigationMenus isVisible={isVisible} pathname={pathname} />

        {/* CONNECT */}
        <div className="hidden lg:flex lg:w-72 lg:justify-end">
          <ConnectWalletBlock />
        </div>
      </div>
    </nav>
  );
};

type MenuProps = {
  pathname: string;
  isVisible: boolean;
};
const NavigationMenus: React.FC<MenuProps> = ({ pathname, isVisible }) => {
  return (
    <ul
      className={
        "z-30 transform duration-500 top-20 lg:top-0 absolute bg-black h-screen w-80 lg:w-auto lg:h-auto lg:flex lg:relative lg:py-0 lg:space-x-8 lg:items-center" +
        " " +
        (isVisible ? "left-0" : "-left-80 lg:left-0")
      }
    >
      {navigationMenus.map((menu) => {
        const isActive = pathname === menu.href || pathname.startsWith(menu.href + "/");
        return (
          <li key={menu.href} className="border-b border-gray-800 lg:border-b-0">
            <Link passHref href={menu.href}>
              <a
                target={menu.target}
                className="block w-full px-8 py-4 duration-200 transform lg:px-0"
              >
                <span
                  className={
                    "font-semibold text-transparent bg-clip-text bg-gradient-to-br whitespace-nowrap text-xl lg:text-base" +
                    " " +
                    (isActive
                      ? "from-pink to-purple"
                      : "from-white to-gray-300 hover:from-pink hover:to-purple")
                  }
                >
                  {menu.title}
                </span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
