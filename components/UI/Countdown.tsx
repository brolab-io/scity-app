import { useEffect, useState } from "react";
import { formatCountDown } from "../../lib/utils";

type Props = {
  endDate?: string | Date;
  className?: string;
};

const Countdown: React.FC<Props> = ({ className, endDate }) => {
  const [value, setValue] = useState(formatCountDown(new Date()));

  useEffect(() => {
    if (endDate) {
      const updateCountdown = () => {
        setValue(formatCountDown(endDate));
      };
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [endDate]);
  return <span className={className}>{value}</span>;
};

export default Countdown;
