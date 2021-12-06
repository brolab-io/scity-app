import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button";
import Container from "../UI/Container";

const Feature = () => {
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
  return (
    <div className="py-12 text-white bg-black md:py-20 lg:py-28 xl:py-40 " id="feature">
      <div className="grid grid-flow-row grid-cols-1 gap-8 sm:grid-flow-col sm:grid-cols-2">
        <div className="flex justify-end w-full">
          <div className="w-full h-full ">
            <Image
              src="/assets/Mask-Group.png"
              alt="Mask Group"
              layout="responsive"
              quality={100}
              className="h-96"
              height={835 / 2}
              width={672 / 2}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full max-w-screen-sm p-8 space-y-8 md:p-12 lg:p-16 xl:p-20">
          <h3 className="text-3xl font-extrabold leading-relaxed lg:text-4xl text-black-600">
            Travel With Us To <br /> A Land of Future
          </h3>
          <p className="my-2 text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
          </p>

          <div className="flex flex-wrap items-center space-y-2 lg:flex-nowrap lg:space-y-0">
            <Button className="px-10 mr-2 rounded-3xl">
              <span>Join Telegram</span>
            </Button>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <Link key={link.href} passHref href={link.href}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-dark-gray"
                  >
                    <Image src={link.icon} height={20} width={20} quality={100} alt="social icon" />
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
