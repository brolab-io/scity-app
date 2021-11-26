import Connect from "./Connect";
import Link from "next/link";
const navigationMenus = [
  {
    title: "Home",
    href: "/",
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
  return (
    <nav className="fixed inset-x-0 top-0 h-20 z-30 bg-black">
      <div className="flex h-full px-4 w-full items-center justify-between">
        {/* LOGO  */}
        <div>LOGO</div>

        {/* NAVIGATION */}
        <NavigationMenus />

        {/* CONNECT */}
        <div>
          <Connect outline />
        </div>
      </div>
    </nav>
  );
};

const NavigationMenus = () => {
  return (
    <ul className="flex space-x-8 items-center">
      {navigationMenus.map((menu) => (
        <ul key={menu.href}>
          <Link passHref href={menu.href}>
            <a className="text-white text-lg font-medium">{menu.title}</a>
          </Link>
        </ul>
      ))}
    </ul>
  );
};

export default Navbar;
