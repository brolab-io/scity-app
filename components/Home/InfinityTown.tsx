import clsx from "clsx";
import { url } from "inspector";
import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";
import useScript from "../../hooks/useScript";
import useWindowSize from "../../hooks/useWindowSize";
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

  console.log(jqueryStatus, threeJsStatus, mainStatus);

  return (
    <PreloadAutoResize>
      <canvas className="" onLoad={console.log}></canvas>
    </PreloadAutoResize>
  );
};

export default memo(InfinityTown, isEqual);
