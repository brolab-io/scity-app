import { useMemo } from "react";

const BackgroundImage: React.FC<{}> = () => {
  const bgStyle = useMemo(
    () => ({
      backgroundImage: `url(/images/backgrounds/Bg.png)`,
    }),
    []
  );

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
      <div
        className="absolute top-0 w-full h-60 bg-center bg-cover"
        style={bgStyle}
      ></div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full ml-auto mr-auto text-center">
            <div className="">
              <h3 className="text-white font-semibold text-5xl">
                Became one of the first resident of Scity
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
