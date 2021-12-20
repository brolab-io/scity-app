import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button";
import Container from "../UI/Container";
import styles from "./Feature.module.css";

const Feature = () => {
  const socialLinks = [
    {
      icon: "/assets/images/landing/instagram.svg",
      href: "https://www.instagram.com/scity.io",
    },
    {
      icon: "/assets/images/landing/facebook.svg",
      href: "https://www.facebook.com/scity.io",
    },
    // {
    //   icon: "/images/icons/twitter.svg",
    //   href: "https://www.twitter.com/scity.io",
    // },
    // {
    //   icon: "/images/icons/google.svg",
    //   href: "https://www.google.com/scity.io",
    // },
    // {
    //   icon: "/images/icons/twitch.svg",
    //   href: "https://www.twitch.com/scity.io",
    // },
  ];
  return (
    <div className="text-white" id="feature">
      <div
        className={clsx(
          styles["travel-right"],
          "grid grid-flow-row grid-cols-1 gap-8 md:grid-flow-col md:grid-cols-2 relative"
        )}
      >
        <div className="flex justify-end w-full">
          <div className={clsx(styles["travel-left"], "w-full")}>
            {/* <Image
              src="/assets/images/landing/bg-travel-left.svg"
              alt="Mask Group"
              layout="responsive"
              quality={100}
              height={835 / 2}
              width={672 / 2}
            /> */}
          </div>
        </div>
        <div
          className={clsx(
            "flex flex-col items-start justify-center w-full max-w-screen-sm p-6 space-y-8 lg:p-16 xl:p-20  text-center md:text-justify"
          )}
        >
          <h3
            className={clsx(
              styles.title,
              "text-3xl font-extrabold leading-relaxed lg:text-4xl text-black-600 w-full uppercase"
            )}
          >
            Travel With Us To <br /> A Land of Future
          </h3>
          <p
            className={clsx(
              styles.subtitle,
              "my-1 text-gray-600  select-none text-left"
            )}
          >
            Residents of Scity would be able to interact to each other with
            various activities like real time meeting, ride city tour buses,
            playing football, visiting museum, theater,go shopping just by
            staying at home. Scity has 4 layers which provide different
            experiences for residents, each layer has it own unique features.
          </p>

          <div className="flex flex-wrap items-center md:space-y-2 lg:flex-nowrap lg:space-y-0">
            <Button
              className={clsx(styles.button, "md:px-10 mr-2 rounded-3xl")}
            >
              <span className="text-white z-10 select-none">Join Telegram</span>
            </Button>
            <div className="flex items-center space-x-1">
              {socialLinks.map((link) => (
                <Link key={link.href} passHref href={link.href}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center rounded-lg"
                  >
                    <Image
                      src={link.icon}
                      height={40}
                      width={40}
                      quality={100}
                      alt="social icon"
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
