import Link from "next/link";
import Clickable from "../UI/Clickable";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import ConnectWalletBlock from "./ConnectWalletBlock";
import ConnectWalletBlockMobile from "./ConnectWalletBlockMobile";
import clsx from "clsx";

const navigationMenus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Buy Land",
    href: "/buy-land",
  },
  {
    title: "Buy Box",
    href: "/buy-box",
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
  const [isTop, setIsTop] = useState(true);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsTop(scrollTop < window.innerHeight - 64);
      };
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <nav
      className={clsx(
        "fixed inset-x-0 top-0 z-30 h-16 bg-[#1F0537] lg:px-4 transform transition-all duration-200"
        // isTop ? "bg-opacity-70" : "bg-opacity-100"
      )}
    >
      <div className="items-center justify-between w-full h-full max-w-screen-xl px-4 mx-auto mt-2 lg:mt-0 lg:flex">
        {/* LOGO  */}
        <div className="flex items-center justify-between w-full lg:justify-center lg:w-72">
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
            <div className="mt-0 lg:hidden">
              <Logo width={86} height={47} />
            </div>
            <div className="hidden lg:block">
              <Logo width={86} height={47} />
            </div>
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
        "z-30 transform duration-500 top-15 lg:top-0 absolute bg-black lg:bg-transparent h-screen w-80 lg:w-auto lg:h-auto lg:flex lg:relative lg:py-0 lg:space-x-8 lg:items-center" +
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
                  className={clsx(
                    "font-semibold text-transparent bg-clip-text bg-gradient-to-br whitespace-nowrap text-[16px]",
                    isActive
                      ? "from-pink to-purple"
                      : "from-white to-white hover:from-pink hover:to-purple"
                  )}
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
