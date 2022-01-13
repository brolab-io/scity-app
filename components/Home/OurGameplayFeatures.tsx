import clsx from "clsx";
import Image from "next/image";
import Button from "../UI/Button";
import Container from "../UI/Container";
import styles from "./OurGameplayFeatures.module.css";

const OurGameplayFeatures: React.FC = () => {
  return (
    <section className="px-6 py-10 md:py-32 text-white relative" id="gameplay">
      <Container>
        <div className="flex flex-wrap justify-center mb-20 text-center">
          <div className="w-full lg:w-6/12">
            <h2 className={clsx(styles.title, "text-4xl font-semibold uppercase")}>
              Our gameplay & Features
            </h2>
            <p className={clsx(styles.subtitle, "m-4 text-lg leading-relaxed text-gray-600")}>
              There are keys make Scity unique!
            </p>
          </div>
        </div>
        <div
          className={clsx(
            styles.feature,
            "grid grid-cols-1 gap-x-12 lg:gap-x-24 gap-y-4 font-light md:grid-cols-2"
          )}
        >
          <div className="flex flex-col space-y-8 justify-center order-2 md:order-1">
            <h2 className={clsx(styles["section-title"], "text-center md:text-left")}>Buy Land</h2>
            <p className={clsx(styles["section-subtitle"], "max-w-md text-[#ebebeb]")}>
              Each city has limited land slots with 4 levels of rarity. Cities are opened
              sequencely, and they will be zoned by the Government, but the chosen city will be
              voted by residents.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}>
                <span className="text-white z-10 select-none">Buy Land Now</span>
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
        </div>
        <div
          className={clsx(
            styles["feature-middle-right"],
            "grid grid-cols-1 gap-x-12 lg:gap-x-24 gap-y-4 font-light md:grid-cols-2 relative"
          )}
        >
          <div className="order-3">
            <Image
              layout="responsive"
              src={"/assets/images/landing/bg-openbusiness-feature.svg"}
              width={200}
              height={200}
              alt="Buy Land"
            />
          </div>
          <div className="flex flex-col space-y-8 justify-center order-4">
            <h2 className={clsx(styles["section-title"], "text-center md:text-left")}>
              Open Business
            </h2>
            <p className={clsx(styles["section-subtitle"], "max-w-md text-[#ebebeb]")}>
              Each land matching to each business shows different profit. Scity provide numerous
              businesses such as hotel, restaurant, store. To maximize profit, residents need to be
              flexible in choosing both rational cities and businesses.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}>
                <span className="text-white z-10 select-none">Buy SCC Now</span>
              </Button>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            styles["feature-bottom-left"],
            "grid grid-cols-1 gap-x-12 lg:gap-x-24 gap-y-4 font-light md:grid-cols-2 relative"
          )}
        >
          <div className="flex flex-col space-y-8 justify-center order-6 md:order-5">
            <h2 className={clsx(styles["section-title"], "text-center md:text-left")}>
              Get Profit
            </h2>
            <p className={clsx(styles["section-subtitle"], "max-w-md text-[#ebebeb]")}>
              There are ways to get benefit in Scity: Token NFT Staking, Business Profit, Daily
              Quest, NFT Item Trading, Create 2 Earn
            </p>
            <div className="flex justify-center md:justify-start">
              <Button className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}>
                <span className="text-white z-10 select-none">Buy SCC Now</span>
              </Button>
            </div>
          </div>
          <div className="order-5 md:order-6">
            <Image
              layout="responsive"
              src={"/assets/images/landing/bg-getprofit-feature.svg"}
              width={200}
              height={200}
              alt="Get Profit"
            />
          </div>
        </div>
        <div
          className={clsx(
            styles["feature-bottom-right"],
            "grid grid-cols-1 gap-x-12 lg:gap-x-24 gap-y-4 font-light md:grid-cols-2 relative"
          )}
        >
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
            <h2 className={clsx(styles["section-title"], "text-center md:text-left")}>
              Marketplace
            </h2>
            <p className={clsx(styles["section-subtitle"], "max-w-md text-[#ebebeb]")}>
              This is the place where residents exchange goods, vouchers, lands, and businesses. In
              addition, there will be some special lands or businesses that will be auctioned on the
              marketplace at special event periods.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button className={clsx(styles.button, "px-10 mr-2 rounded-3xl ")}>
                <span className="text-white z-10 select-none">Explore Marketplace</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurGameplayFeatures;
