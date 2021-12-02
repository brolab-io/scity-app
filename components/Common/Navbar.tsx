import Connect from "./Connect";
import Link from "next/link";
import Clickable from "../UI/Clickable";
import Balance from "./Balance";
import Account from "./Account";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import NavbarAccountPopover from "./NavbarAccountPopover";
import clsx from "clsx";

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
    <nav className="fixed inset-x-0 top-0 z-30 h-20 p-4 bg-black border-b border-gray-600 lg:p-0">
      <div className="items-center justify-between w-full h-full px-4 lg:flex">
        {/* LOGO  */}
        <div className="flex items-center justify-between w-full lg:w-72 lg:justify-start">
          <Clickable onClick={toggle}>
            <svg
              className="w-10 h-10 -mb-2 text-white fill-current lg:hidden"
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
          <div className="w-10 lg:hidden" />
        </div>

        {/* NAVIGATION */}
        <NavigationMenus isVisible={isVisible} pathname={pathname} />

        {/* CONNECT */}
        <div className="hidden lg:flex lg:w-72 lg:justify-end">
          {active ? (
            <div className="relative flex-none hidden px-2 mx-2 group lg:flex">
              <Clickable href="/inventory">
                <a
                  className={clsx(
                    "flex items-stretch duration-100 ease-out transform bg-white shadow-md rounded-xl hover:shadow-lg z-20"
                  )}
                >
                  <Balance />
                  <Account />
                </a>
              </Clickable>
              <div
                className={clsx(
                  "absolute top-9 skew-x-0 right-2 z-10 transform duration-200 w-76",
                  "opacity-0 invisible",
                  "group-hover:opacity-100 group-hover:visible"
                )}
              >
                <div className="bg-opacity-0 h-7"></div>
                <div className="border rounded-lg bg-dark border-primary">
                  <NavbarAccountPopover />
                </div>
              </div>
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
        "transform duration-500 top-20 lg:top-0 absolute bg-black h-screen w-80 lg:w-auto lg:h-auto lg:flex lg:relative lg:py-0 lg:space-x-8 lg:items-center" +
        " " +
        (isVisible ? "left-0" : "-left-80 lg:left-0")
      }
    >
      {navigationMenus.map((menu) => {
        const isActive = pathname === menu.href || pathname.startsWith(menu.href + "/");
        return (
          <li key={menu.href} className="border-b border-gray-800 lg:border-b-0">
            <Link passHref href={menu.href}>
              <a className="block w-full px-8 py-4 duration-200 transform lg:px-0">
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
