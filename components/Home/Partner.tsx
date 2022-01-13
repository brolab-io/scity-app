import clsx from "clsx";
import Container from "../UI/Container";
import styles from "./Partner.module.css";
import Image from "next/image";
const myPartners = [
  {
    name: "F41 Capital",
    img: "",
  },
];

const Partner = () => {
  return (
    <div className={clsx("relative")}>
      <div>
        <Container className="px-4 py-10 mt-10 md:px-6 lg:px-8 xl:px-10" id="partner">
          <div
            className={clsx(
              styles.bg,
              "grid grid-flow-row grid-cols-1 gap-8 md:grid-flow-col md:grid-cols-2 relative py-20 "
            )}
          >
            <div
              className={clsx(
                "flex flex-col items-start justify-center w-full max-w-screen-sm space-y-6 lg:p-16 xl:p-20  text-center md:text-justify"
              )}
            >
              <h3
                className={clsx(
                  "text-3xl font-extrabold leading-relaxed lg:text-4xl text-white w-full uppercase, font-[24px] md:dont-[40px] uppercase"
                )}
              >
                Our partner
              </h3>
              <p
                className={clsx(
                  "my-1 text-white/80 select-none text-center md:text-left  font-[14px] leading-[21px] md:font-[16px] md:leading-[24px] font-[400]"
                )}
              >
                Together we build the future!
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 z-10">
              <div className="md:col-span-2 flex justify-start md:justify-center items-center">
                <div
                  className={clsx(
                    styles["bg-partner"],
                    "flex justify-center items-center px-3 lg:px-8 xl:px-0"
                  )}
                >
                  <Image
                    src={"/assets/partners/f41-capital.svg"}
                    alt="f41-capital"
                    width={218}
                    height={63}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className={clsx(styles["bg-partner"], "flex justify-center items-center")}>
                  <Image
                    src={"/assets/partners/AmazonWebservices_Logo.svg"}
                    alt="aws"
                    width={218}
                    height={63}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className={clsx(
                    styles["bg-partner"],
                    "flex justify-center items-center md:translate-y-1/4"
                  )}
                >
                  <Image
                    src={"/assets/partners/arena-53.svg"}
                    alt="arena-53"
                    width={218}
                    height={63}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Partner;
