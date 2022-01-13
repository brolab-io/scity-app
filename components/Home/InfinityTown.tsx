import clsx from "clsx";
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
  const threeJsStatus = useScript("js/lib/three.min.js?v=1529488004622", jqueryStatus === "ready");
  const mainStatus = useScript("js/main.min.js?v=1529488004622", threeJsStatus === "ready");

  const handleScrollDown = () => {
    if (typeof window !== "undefined") {
      const scrollTo = document.getElementById("video");
      if (scrollTo) {
        scrollTo?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <div className="mt-16">
      <PreloadAutoResize>
        <div className="relative">
          <canvas className={styles.canvas} onLoad={console.log}></canvas>

          <Clickable
            className="absolute bottom-0 -translate-x-1/2 left-1/2"
            onClick={handleScrollDown}
          >
            <div className="animate-bounce">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_f_139_98)">
                  <circle cx="50" cy="50" r="28" fill="url(#paint0_linear_139_98)" />
                </g>
                <circle cx="50" cy="50" r="28" fill="url(#paint1_radial_139_98)" />
                <path
                  d="M50 39.1111V60.8889"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M60.8889 50L50 60.8889L39.1111 50"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_f_139_98"
                    x="0.918919"
                    y="0.918919"
                    width="98.1622"
                    height="98.1622"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur stdDeviation="10.5405" result="effect1_foregroundBlur_139_98" />
                  </filter>
                  <linearGradient
                    id="paint0_linear_139_98"
                    x1="50"
                    y1="22"
                    x2="50"
                    y2="78"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#833EF1" />
                    <stop offset="1" stopColor="#491CB5" />
                  </linearGradient>
                  <radialGradient
                    id="paint1_radial_139_98"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(92.3084 118.833) rotate(-128.567) scale(143.245 159.914)"
                  >
                    <stop offset="0.244792" stopColor="#E250E5" />
                    <stop offset="1" stopColor="#4B50E6" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </Clickable>
        </div>
      </PreloadAutoResize>
    </div>
  );
};

export default memo(InfinityTown, isEqual);
