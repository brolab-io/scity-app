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
    <div className="flex items-center content-center justify-center h-screen">
      <div className="w-full  py-32 bg-center bg-cover sm:py-44 md:py-56 lg:py-68 xl:py-80 sm:px-6 lg:px-8 relative h-screen">
        <video
          className={clsx(
            "aspect-video absolute top-0 left-0 bottom-0 right-0 h-screen object-cover w-full"
          )}
          playsInline
          autoPlay
          muted
          loop
        >
          <source
            src="https://res.cloudinary.com/leopham/video/upload/v1640023636/video/wznohmplc8uxjoy0tdwi.mp4"
            type="video/mp4"
          />
        </video>
        <div className=" mx-auto px-4 absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center w-full h-screen">
          <div className="flex flex-col items-center space-y-10">
            <h3 className="text-lg md:text-3xl lg:text-5xl font-bold text-center text-white uppercase">
              Become one of the first resident of Scity
            </h3>
            <button
              className={clsx(
                "px-12 py-3 rounded-3xl hover:brightness-75 transition duration-200",
                styles.button
              )}
            >
              <span className="text-xl font-medium text-white font-[16px]">
                Enter Marketplace
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
