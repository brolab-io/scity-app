import clsx from "clsx";
import Button from "../UI/Button";
import Container from "../UI/Container";
import styles from "./HeroSections.module.css";
import Image from "next/image";
import SvgIconRocket from "../Icons/SvgIconRocket";
import SvgIconPaper from "../Icons/SvgIconPaper";

const HeroSection: React.FC = () => {
  return (
    <>
      <section className="relative pt-20 bg-black md:pt-28 lg:pt-32 xl:pt-40">
        <div>
          {/* <Image
            width="1263"
            height="1404"
            src="/images/backgrounds/bg-earth.svg"
            layout="responsive"
            alt="bg"
          /> */}
          <Container className={clsx(styles.hero, "relative")}>
            <div
              className={clsx(
                styles["scity-hero-bg"],
                "absolute inset-0 bg-no-repeat bg-center w-full"
              )}
            >
              <div className="relative pl-24">
                <div className="absolute -bottom-14 -left-16 sm:-left-12 md:-left-1 lg:-left-1 xl:left-28">
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
                      "text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
                      "-mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-10"
                    )}
                  >
                    The next generation of metaverse world
                  </p>
                  <div className="flex flex-wrap items-center mt-6 sm:flex-nowrap lg:mt-8">
                    <Button outline className="px-6 mr-4 lg:px-8 xl:px-10 rounded-3xl">
                      <SvgIconRocket className="w-6 h-6" />
                      <span>Explore</span>
                    </Button>
                    <Button className="px-6 mt-4 lg:px-8 xl:px-10 rounded-3xl md:mt-0 md:ml-4">
                      <SvgIconPaper className="w-6 h-6" />
                      <span className="ml-2">Buy SCC</span>
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
