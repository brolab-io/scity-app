import clsx from "clsx";
import { url } from "inspector";
import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";
import useScript from "../../hooks/useScript";
import useWindowSize from "../../hooks/useWindowSize";
import Clickable from "../UI/Clickable";
import styles from "./InfinityTown.module.css";

const PreloadAutoResize: React.FC = ({ children }) => {
  const [, height] = useWindowSize();

  const style = useMemo(
    () => ({
      height: `${height}px`,
    }),
    [height]
  );
  return (
    <div style={style} className={clsx("w-screen bg-center", styles.bg)}>
      {children}
    </div>
  );
};

const InfinityTown = () => {
  const jqueryStatus = useScript(
    "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    true
  );
  const threeJsStatus = useScript(
    "js/lib/three.min.js?v=1529488004622",
    jqueryStatus === "ready"
  );
  const mainStatus = useScript(
    "js/main.min.js?v=1529488004622",
    threeJsStatus === "ready"
  );

  console.log(jqueryStatus, threeJsStatus, mainStatus);

  const handleScrollDown = () => {
    if (typeof window !== "undefined") {
      const scrollTo = document.getElementById("section-about");
      if (scrollTo) {
        scrollTo?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <PreloadAutoResize>
      <div className="relative">
        <canvas className="" onLoad={console.log}></canvas>
        <div className="absolute bottom-0 left-0 z-40 w-full h-16 bg-black/50 flex justify-center ">
          <Clickable className="flex animate-bounce" onClick={handleScrollDown}>
            <svg
              className="text-white fill-current rotate-90"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 20 20"
            >
              <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
          </Clickable>
        </div>
      </div>
    </PreloadAutoResize>
  );
};

export default memo(InfinityTown, isEqual);
