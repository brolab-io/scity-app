import Connect from "./Connect";
import Link from "next/link";
import Clickable from "./Clickable";
import Balance from "./Balance";
import Account from "./Account";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

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
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Activity",
    href: "/activity",
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
    title: "Contact",
    href: "/contact",
  },
];

const Navbar: React.FC = () => {
  const { active } = useWeb3React();
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
    <nav className="fixed inset-x-0 top-0 p-4 lg:p-0 h-20 z-30 bg-black border-b border-gray-600">
      <div className="lg:flex h-full px-4 w-full items-center justify-between">
        {/* LOGO  */}
        <div className="flex justify-between items-center w-full lg:w-80 lg:justify-start">
          <Clickable onClick={toggle}>
            <svg
              className="h-10 w-10 fill-current text-white lg:hidden -mb-2"
              height="32px"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
          </Clickable>
          <Link passHref href="/">
            <a className="flex items-center space-x-1 transform duration-200 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 hover:from-pink hover:to-purple">
              <Image
                layout="fixed"
                src="/logo.svg"
                height={36}
                width={36}
                alt="logo"
              />
              <div className="mt-2">
                <span className="text-3xl font-medium select-none">SCITY</span>
              </div>
            </a>
          </Link>
          <div className="w-10 lg:hidden" />
        </div>

        {/* NAVIGATION */}
        <NavigationMenus isVisible={isVisible} pathname={pathname} />

        {/* CONNECT */}
        <div className="hidden lg:flex w-80 lg:justify-end">
          {active ? (
            <div className="flex-none hidden px-2 mx-2 lg:flex">
              <Clickable className="flex items-stretch bg-white rounded-xl shadow-md transform ease-out duration-100 hover:shadow-lg hover:scale-105">
                <Balance />
                <Account />
              </Clickable>
            </div>
          ) : (
            <Connect outline />
          )}
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
        "transform duration-500 top-20 lg:top-0 absolute bg-black h-screen w-80 lg:w-auto lg:h-auto lg:flex lg:relative lg:py-0 lg:space-x-8 items-center" +
        " " +
        (isVisible ? "left-0" : "-left-80")
      }
    >
      {navigationMenus.map((menu) => {
        const isActive =
          pathname === menu.href || pathname.startsWith(menu.href + "/");
        return (
          <li
            key={menu.href}
            className="border-b lg:border-b-0 border-gray-800"
          >
            <Link passHref href={menu.href}>
              <a className="block transform duration-200 px-8 lg:px-0 w-full py-4">
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
