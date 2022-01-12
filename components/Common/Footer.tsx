import Container from "../UI/Container";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import Button from "../UI/Button";
import { useMemo } from "react";
import clsx from "clsx";
import styles from "./Footer.module.css";
const socialLinks = [
  {
    icon: "/images/icons/facebook.svg",
    href: "https://www.facebook.com/scity.io",
  },
  {
    icon: "/images/icons/twitter.svg",
    href: "https://www.twitter.com/scity.io",
  },
  {
    icon: "/images/icons/google.svg",
    href: "https://www.google.com/scity.io",
  },
  {
    icon: "/images/icons/twitch.svg",
    href: "https://www.twitch.com/scity.io",
  },
];

const useFullLinks = [
  {
    title: "My Account",
    children: [
      {
        title: "Authors",
        href: "#",
      },
      {
        title: "Collection",
        href: "#",
      },
      {
        title: "Author Profile",
        href: "#",
      },
      {
        title: "Create Collection",
        href: "#",
      },
    ],
  },
  {
    title: "Resources",
    children: [
      {
        title: "Help & Support",
        href: "#",
      },
      {
        title: "Live Auctions",
        href: "#",
      },
      {
        title: "Item Details",
        href: "#",
      },
      {
        title: "Activity",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    children: [
      {
        title: "About Us",
        href: "#",
      },
      {
        title: "Contact Us",
        href: "#",
      },
      {
        title: "Our Blog",
        href: "#",
      },
      {
        title: "Discover",
        href: "#",
      },
    ],
  },
  {
    title: "Social Network",
    children: [
      {
        title: "Facebook",
        href: "#",
      },
      {
        title: "Tweeter",
        href: "#",
      },
      {
        title: "Google",
        href: "#",
      },
      {
        title: "Youtube",
        href: "#",
      },
    ],
  },
];

const Footer: React.FC = () => {
  const clipPathStyle = useMemo(
    () => ({
      clipPath: `polygon(50% 0%, 100% 30%, 100% 100%, 0 100%, 0 30%)`,
      background: "linear-gradient(180deg, #833EF1 0%, #491CB5 100%)",
    }),
    []
  );

  return (
    <div className={clsx(styles.footer, "px-3 sm:px-4 py-10 md:py-20 space-y-10 bg-[#1F0537]")}>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-2 md:gap-x-4 lg:px-4">
          {/* COL 1 */}
          <div className="flex items-center justify-center col-span-2 px-2 space-y-4 lg:col-span-1 lg:px-4">
            <Logo width={160} height={160} />
          </div>

          {/* COL 2 - 3 -4 */}
          {useFullLinks.map((section, index) => (
            <div key={index.toString()} className="flex items-center px-2 lg:px-4">
              <ul className="space-y-4">
                <h6 className="flex mb-6 text-white font-[600] text-[18px]">{section.title}</h6>
                {section.children.map((link, idx) => (
                  <li className="flex justify-start " key={`${index}-${idx}`}>
                    <Link passHref href={link.href}>
                      <a>
                        <span
                          className={clsx(
                            "text-transparent whitespace-nowrap py-1.5 font-[400] text-[16px] text-[#aaaaaa] hover:text-white"
                          )}
                        >
                          {link.title}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* COL 5 */}
          {/* <div className="px-2 space-y-3 xl:col-span-3 lg:px-4">
            <span className="flex mb-3 text-lg font-semibold text-white">
              Subscribe Us
            </span>
            <input
              className="w-full px-4 py-2.5 text-white bg-transparent border border-gray-700 rounded-xl"
              placeholder="yourmail@example.com"
            />
            <Button>
              <span className="mr-2 -mb-1">
                <Image
                  src="/images/icons/send.svg"
                  height={16}
                  width={16}
                  quality={100}
                  alt="send"
                />
              </span>
              <span>Subscribe</span>
            </Button>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
