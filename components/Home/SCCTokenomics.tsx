import clsx from "clsx";
import Container from "../UI/Container";
import styles from "./SCCTokenomics.module.css";

const SCCTokenomics = () => {
  return (
    <Container className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10">
      <div className="space-y-6 text-center">
        <h3 className="space-x-4 text-xl font-extrabold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          <span className="text-purple-600">SCC</span>
          <span className="text-white">Tokenomics</span>
        </h3>
        <p className="mx-auto text-white w-80">
          We believe artists need to be compensated for every sale,not just the first one!
        </p>
      </div>
      <div
        className={clsx(styles["total-supply-container"], "relative bg-150 sm:bg-125 lg:bg-100")}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <span className="block text-sm font-bold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-4xl">
            1.000.000.000 <span className="text-purple-700">SCC</span>
          </span>
          <span className="block text-lg font-bold text-gray-300 md:text-xl lg:text-2xl">
            Total supply
          </span>
        </div>
      </div>
    </Container>
  );
};

export default SCCTokenomics;
