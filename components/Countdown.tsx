import { useEffect, useState } from "react";
import { formatCountDown } from "../utils";

type Props = {
  endDate: string;
  className?: string;
};

const Countdown: React.FC<Props> = ({ className, endDate }) => {
  const [value, setValue] = useState(formatCountDown(endDate));

  useEffect(() => {
    const updateCountdown = () => {
      setValue(formatCountDown(endDate));
    };
    const interval = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [endDate]);
  return <span className={className}>{value}</span>;
};

export default Countdown;
