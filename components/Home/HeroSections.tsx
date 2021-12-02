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
              className={clsx(
                styles["scity-hero-bg"],
                "absolute inset-0 bg-no-repeat bg-center w-full"
              )}
            >
              <div className="relative">
                <div className="absolute -bottom-14 -left-40 md:-left:32 lg:-lef:24 xl:-left-14">
                  <Image src="/images/icons/coin1.png" alt="coin" height={230} width={230} />
                </div>
                <div className="pl-12 md:pl-24 lg:pl-32 xl:pl-56">
                  <h1
                    className={clsx(
                      styles["scity-hero-text"],
                      "text-gradient text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl bg-gradient-to-t font-poppins font-bold text-black stroke-2 bg-clip-text"
                    )}
                  >
                    SCITY
                  </h1>
                  <p
                    className={clsx(
                      "font-bold leading-relaxed text-white",
                      "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
                      "-mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 xl:-mt-12 2xl:-mt-14"
                    )}
                  >
                    The new world is coming
                  </p>
                  <div className="flex space-x-4">
                    <Button outline className="px-6 lg:px-8 xl:px-10 rounded-3xl">
                      Explore
                    </Button>
                    <Button className="px-6 lg:px-8 xl:px-10 rounded-3xl ">
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
