import Connect from "./Connect";
import Link from "next/link";
import Clickable from "./Clickable";
import Balance from "./Balance";
import Account from "./Account";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";

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
  return (
    <nav className="fixed inset-x-0 top-0 h-20 z-30 bg-black">
      <div className="flex h-full px-4 w-full items-center justify-between">
        {/* LOGO  */}
        <Link passHref href="/">
          <a className="flex items-center space-x-1">
            <Image
              layout="fixed"
              src="/logo.svg"
              height={36}
              width={36}
              alt="logo"
            />
            <div className="mt-2">
              <span className="text-3xl font-medium text-white select-none">
                SCITY
              </span>
            </div>
          </a>
        </Link>

        {/* NAVIGATION */}
        <NavigationMenus />

        {/* CONNECT */}
        <div>
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

const NavigationMenus = () => {
  return (
    <ul className="flex space-x-8 items-center">
      {navigationMenus.map((menu) => (
        <li key={menu.href}>
          <Link passHref href={menu.href}>
            <a className="transform duration-200 hover:scale-105">
              <span className="text-white hover:text-primary font-semibold">
                {menu.title}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
