import { useMemo } from "react";
import Button from "../UI/Button";

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
        className="w-full py-32 bg-center bg-cover sm:py-44 md:py-56 lg:py-68 xl:py-80"
        style={bgStyle}
      >
        <div className="container relative mx-auto">
          <div className="flex flex-col items-center space-y-10">
            <h3 className="text-5xl font-semibold text-white">
              Became one of the first resident of Scity
            </h3>
            <Button className="px-6 py-3 rounded-3xl">
              <span className="text-xl">Enter Marketplace</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
