import clsx from "clsx";
import Image from "next/image";
import Button from "../UI/Button";
import Clickable from "../UI/Clickable";
import Container from "../UI/Container";
import styles from "./OurGameplayFeatures.module.css";

const OurGameplayFeatures: React.FC = () => {
  const lists = [
    {
      icon: "/images/icons/buy-land.svg",
      title: "Buy Land",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      icon: "/images/icons/open-business.svg",
      title: "Open Business",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      icon: "/images/icons/get-profit.svg",
      title: "Get Profit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      icon: "/images/icons/trading-icon.svg",
      title: "Trading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
  ];
  return (
    <section className="px-6 py-10 text-white ">
      <Container>
        <div className="flex flex-wrap justify-center mb-20 text-center">
          <div className="w-full lg:w-6/12">
            <h2
              className={clsx(styles.title, "text-4xl font-semibold uppercase")}
            >
              Our gameplay & Features
            </h2>
            <p
              className={clsx(
                styles.subtitle,
                "m-4 text-lg leading-relaxed text-gray-600"
              )}
            >
              We believe artists need to be compensated for every sale,not just
              the first one!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-12 lg:gap-x-24 gap-y-4 font-light md:grid-cols-2">
          <div className="flex flex-col space-y-8 justify-center order-2 md:order-1">
            <h2
              className={clsx(
                styles["section-title"],
                "text-center md:text-left"
              )}
            >
              Buy Land
            </h2>
            <p
              className={clsx(
                styles["section-subtitle"],
                "max-w-md text-[#ebebeb]"
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              numquam tenetur esse sed exercitationem. Praesentium incidunt
              fugit eum assumenda quasi aspernatur facilis odio dolore
              consequatur quae, labore nulla quibusdam distinctio.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}
              >
                <span className="text-white z-10 select-none">
                  Buy Land Now
                </span>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              layout="responsive"
              src={"/assets/images/landing/bg-buyland-feature.svg"}
              width={200}
              height={200}
              alt="Buy Land"
            />
          </div>
          <div className="order-3">
            <Image
              layout="responsive"
              src={"/assets/images/landing/bg-getprofit-feature.svg"}
              width={200}
              height={200}
              alt="Get Profit"
            />
          </div>
          <div className="flex flex-col space-y-8 justify-center order-4">
            <h2
              className={clsx(
                styles["section-title"],
                "text-center md:text-left"
              )}
            >
              Get Profit
            </h2>
            <p
              className={clsx(
                styles["section-subtitle"],
                "max-w-md text-[#ebebeb]"
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              numquam tenetur esse sed exercitationem. Praesentium incidunt
              fugit eum assumenda quasi aspernatur facilis odio dolore
              consequatur quae, labore nulla quibusdam distinctio.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}
              >
                <span className="text-white z-10 select-none">Buy SCC Now</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-8 justify-center order-6 md:order-5">
            <h2
              className={clsx(
                styles["section-title"],
                "text-center md:text-left"
              )}
            >
              Open Business
            </h2>
            <p
              className={clsx(
                styles["section-subtitle"],
                "max-w-md text-[#ebebeb]"
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              numquam tenetur esse sed exercitationem. Praesentium incidunt
              fugit eum assumenda quasi aspernatur facilis odio dolore
              consequatur quae, labore nulla quibusdam distinctio.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}
              >
                <span className="text-white z-10 select-none">Buy SCC Now</span>
              </Button>
            </div>
          </div>
          <div className="order-5 md:order-6">
            <Image
              layout="responsive"
              src={"/assets/images/landing/bg-openbusiness-feature.svg"}
              width={200}
              height={200}
              alt="Buy Land"
            />
          </div>
          <div className="order-7">
            <Image
              layout="responsive"
              src={"/assets/images/landing/bg-marketplace-feature.svg"}
              width={200}
              height={200}
              alt="Marketplace"
            />
          </div>
          <div className="flex flex-col space-y-8 justify-center order-8">
            <h2
              className={clsx(
                styles["section-title"],
                "text-center md:text-left"
              )}
            >
              Marketplace
            </h2>
            <p
              className={clsx(
                styles["section-subtitle"],
                "max-w-md text-[#ebebeb]"
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              numquam tenetur esse sed exercitationem. Praesentium incidunt
              fugit eum assumenda quasi aspernatur facilis odio dolore
              consequatur quae, labore nulla quibusdam distinctio.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}
              >
                <span className="text-white z-10 select-none">
                  Buy Land Now
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurGameplayFeatures;
