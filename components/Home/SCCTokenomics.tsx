import clsx from "clsx";
import Container from "../UI/Container";
import styles from "./SCCTokenomics.module.css";

const SCCTokenomics = () => {
  return (
    <Container className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10" id="tokenomic">
      <div className="space-y-8 text-center">
        <h3 className="space-x-4 text-xl font-bold text-[32px] lg:text-[40px] uppercase">
          <span className="text-[#BF03DE]">SCC</span>
          <span className="text-white">Tokenomics</span>
        </h3>
        <p className="mx-auto text-white/80 text-[16px] ">
          We believe artists need to be compensated for every sale,not just the first one!
        </p>
      </div>
      <div
        className={clsx(
          styles["total-supply-container"],
          "relative bg-150 sm:bg-125 lg:bg-100 -mb-12 md:-mb:20 lg:-mt-24 lg:-mb-40"
        )}
      ></div>
    </Container>
  );
};

export default SCCTokenomics;
