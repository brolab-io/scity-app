import { useMemo } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import LoadingIcon from "../UI/LoadingIcon";

export default function LoadingAutoResize() {
  const [height] = useWindowSize();
  const style = useMemo(() => ({ height: `${height}px` }), [height]);
  console.log(style);
  return (
    <div style={style} className="flex items-center justify-center">
      <LoadingIcon className="h-20 w-20 fill-current text-white" />
    </div>
  );
}
