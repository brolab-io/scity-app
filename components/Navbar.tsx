import Connect from "./Connect";
import Link from "next/link";
import Clickable from "./Clickable";
import Balance from "./Balance";
import Account from "./Account";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();

  return (
    <nav className="fixed inset-x-0 top-0 h-20 z-30 bg-black">
      <div className="flex h-full px-4 w-full items-center justify-between">
        {/* LOGO  */}
        <div className="w-80">
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
        </div>

        {/* NAVIGATION */}
        <NavigationMenus pathname={pathname} />

        {/* CONNECT */}
        <div className="w-80 flex justify-end">
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
};
const NavigationMenus: React.FC<MenuProps> = ({ pathname }) => {
  return (
    <ul className="flex space-x-8 items-center">
      {navigationMenus.map((menu) => {
        console.log(pathname);
        const isActive =
          pathname === menu.href || pathname.startsWith(menu.href + "/");
        return (
          <li key={menu.href}>
            <Link passHref href={menu.href}>
              <a className="transform duration-200 hover:scale-110">
                <span
                  className={
                    "font-semibold text-transparent bg-clip-text bg-gradient-to-br" +
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
