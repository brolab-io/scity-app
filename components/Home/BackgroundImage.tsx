import clsx from "clsx";
import { useMemo } from "react";
import styles from "./BackgroundImage.module.css";

const BackgroundImage: React.FC<{}> = () => {
  const bgStyle = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/Bg.png)`,
    }),
    []
  );

  return (
    <div className="flex items-center content-center justify-center">
      <div
        className="w-full px-4 py-32 bg-center bg-cover sm:py-44 md:py-56 lg:py-68 xl:py-80 sm:px-6 lg:px-8"
        style={bgStyle}
      >
        <div className="container relative mx-auto">
          <div className="flex flex-col items-center space-y-10">
            <h3 className="text-5xl font-bold text-center text-white uppercase text-[40px]">
              Become one of the first resident of Scity
            </h3>
            <button
              className={clsx(
                "px-12 py-3 rounded-3xl hover:brightness-75 transition duration-200",
                styles.button
              )}
            >
              <span className="text-xl font-medium text-white font-[16px]">Enter Marketplace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
