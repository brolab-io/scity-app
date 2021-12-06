import clsx from "clsx";
import { useMemo } from "react";

type Props = {
  percentage: number;
  color: string;
  className?: string;
};

const ProgressBar: React.FC<Props> = ({ percentage, color, className }) => {
  const style = useMemo(
    () => ({
      background: "linear-gradient(216.56deg, #E250E5 5.32%, #4B50E6 94.32%)",
      width: `${percentage}%`,
    }),
    [percentage]
  );
  return (
    <div className="relative w-full h-3 bg-opacity-50 rounded-full bg-light-gray">
      <div style={style} className={(clsx(className), "rounded-full h-3 absolute inset-0")}></div>
    </div>
  );
};

export default ProgressBar;
