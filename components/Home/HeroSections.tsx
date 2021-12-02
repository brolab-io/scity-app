import clsx from "clsx";
import Button from "../UI/Button";
import Container from "../UI/Container";
import styles from "./HeroSections.module.css";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <>
      <section className="relative pt-20 bg-black md:pt-28 lg:pt-32 xl:pt-40">
        <div className="bg-black">
          <Container className={clsx(styles.hero, "relative")}>
            <div
              className={clsx(styles["scity-hero-bg"], "absolute inset-0 bg-no-repeat bg-center")}
            >
              <div className="relative">
                <div className="absolute -bottom-14 -left-14">
                  <Image src="/images/icons/coin1.png" alt="coin" height={230} width={230} />
                </div>
                <div className="pl-56">
                  <h1
                    className={clsx(
                      styles["scity-hero-text"],
                      "text-gradient bg-gradient-to-t font-poppins font-bold text-black stroke-2 bg-clip-text"
                    )}
                  >
                    SCITY
                  </h1>
                  <p className="text-6xl font-bold leading-relaxed text-white -mt-14">
                    The new world is coming
                  </p>
                  <div className="flex space-x-4">
                    <Button outline className="px-10 rounded-3xl">
                      Explore
                    </Button>
                    <Button className="px-10 rounded-3xl ">
                      <span>Buy SCC</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
