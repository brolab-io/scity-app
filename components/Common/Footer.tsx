import Container from "../UI/Container";
import Logo from "../UI/Logo";
import Link from "next/link";
import Image from "next/image";
import Button from "../UI/Button";
import { useMemo } from "react";
import clsx from "clsx";

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
    <div className="py-20 space-y-10 bg-black">
      <div style={clipPathStyle} className="pt-24 pb-20 space-y-5 text-center">
        <h2 className="text-2xl text-white md:text-3xl lg:text-4xl">
          SCITY - METAVERSE
        </h2>
        <p className="text-lg font-semibold text-white md:text-xl lg:text-2xl">
          BUY LAND - OPEN BUSINESS - EARN PROFIT
        </p>
      </div>
      <Container>
        <div className="grid grid-cols-2 px-8 gap-y-10 gap-x-2 md:gap-x-4 lg:grid-cols-4 xl:grid-cols-12 lg:px-4">
          {/* COL 1 */}
          <div className="col-span-2 px-2 space-y-4 lg:col-span-4 xl:col-span-3 lg:px-4">
            <Logo />
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis non,
              fugit totam vel laboriosam vitae.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <Link key={link.href} passHref href={link.href}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center rounded-lg h-9 w-9 bg-dark-gray"
                  >
                    <Image
                      src={link.icon}
                      height={20}
                      width={20}
                      quality={100}
                      alt="facebook"
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* COL 2 - 3 -4 */}
          {useFullLinks.map((section, index) => (
            <div key={index.toString()} className="px-2 xl:col-span-2 lg:px-4">
              <ul className="space-y-1">
                <span className="flex mb-3 text-lg font-semibold text-white">
                  {section.title}
                </span>
                {section.children.map((link, idx) => (
                  <li className="flex justify-start" key={`${index}-${idx}`}>
                    <Link passHref href={link.href}>
                      <a
                        className={clsx(
                          "flex py-1.5 text-sm text-transparent bg-clip-text bg-gradient-to-br whitespace-nowrap",
                          "from-white to-gray-300 hover:from-pink hover:to-purple"
                        )}
                      >
                        {link.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* COL 5 */}
          <div className="px-2 space-y-3 xl:col-span-3 lg:px-4">
            <span className="flex mb-3 text-lg font-semibold text-white">
              Subscribe Us
            </span>
            <input
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-700 rounded-lg"
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
              <span>Subscribe now</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
