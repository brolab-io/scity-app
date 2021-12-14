import clsx from "clsx";
import Container from "../UI/Container";
import styles from "./SCCTokenomics.module.css";

const SCCTokenomics = () => {
  return (
    <Container className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10">
      <div className="space-y-8 text-center">
        <h3 className="space-x-4 text-xl font-bold text-[40px] uppercase">
          <span className="text-purple-600">SCC</span>
          <span className="text-white">Tokenomics</span>
        </h3>
        <p className="mx-auto text-white text-[16px]">
          We believe artists need to be compensated for every sale,not just the first one!
        </p>
      </div>
      <div
        className={clsx(
          styles["total-supply-container"],
          "relative bg-150 sm:bg-125 lg:bg-100 -mt-24 -mb-40"
        )}
      ></div>
    </Container>
  );
};

export default SCCTokenomics;
