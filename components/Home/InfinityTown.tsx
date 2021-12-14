import { memo } from "react";
import isEqual from "react-fast-compare";
import useScript from "../../hooks/useScript";
import LoadingAutoResize from "../Common/LoadingAutoResize";

const InfinityTown = () => {
  const jqueryStatus = useScript(
    "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    true
  );
  const threeJsStatus = useScript("js/lib/three.min.js?v=1529488004622", jqueryStatus === "ready");
  const mainStatus = useScript("js/main.min.js?v=1529488004622", threeJsStatus === "ready");

  console.log(jqueryStatus, threeJsStatus, mainStatus);

  return (
    <div className="relative">
      <canvas onLoad={console.log}></canvas>
    </div>
  );
};

export default memo(InfinityTown, isEqual);
