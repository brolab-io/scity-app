import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Logo from "../Common/Logo";
import { Transition } from "@headlessui/react";

const SidebarItems = () => {
  const memuItems = useMemo(
    () => [
      {
        title: "Marketplace",
        href: "/marketplace",
        icon: "/assets/images/icons/marketplace.svg",
      },
      {
        title: "Buy $SCC",
        href: "/buy-scc",
        // target: "_blank",
        icon: "/assets/images/icons/buy-SCC.svg",
      },
      {
        title: "My Asset",
        href: "/my-asset",
        icon: "/assets/images/icons/my-asset.svg",
      },
      {
        title: "NFT Land",
        href: "/nft-land",
        icon: "/assets/images/icons/NFT-land.svg",
      },
      {
        title: "NFT Business",
        href: "/nft-business",
        icon: "/assets/images/icons/NFT-business.svg",
      },
      {
        title: "Farming",
        href: "farming",
        icon: "/assets/images/icons/farming.svg",
      },
      {
        title: "Pool",
        href: "/pool",
        icon: "/assets/images/icons/pool.svg",
      },
    ],
    []
  );
  const { pathname } = useRouter();
  return (
    <div className="sticky mx-3 min-h-[calc(100vh-1.5rem)] top-3 bg-[#1F2530] rounded-[24px] divide-y divide-[#2D3748] p-3">
      <div className="py-6 flex justify-center">
        <Logo width={103} height={103} />
      </div>
      <ul className="py-5">
        {memuItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={index}>
              <Link href={item.href} passHref>
                <a
                  // target={item.target}
                  className={clsx(
                    "text-white text-[16px] font-medium flex p-4 rounded-[16px] items-center space-x-3",
                    isActive && "bg-magenta"
                  )}
                  href={item.href}
                >
                  <Image src={item.icon} height={18} width={18} alt={`Icon ${item.title}`} />
                  <span>{item.title}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Sidebar = () => {
  return (
    <Transition
      as="div"
      className="block"
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0 left-[-200px]"
      enterTo="opacity-100 left-0"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <SidebarItems />
    </Transition>
  );
};

export default Sidebar;
