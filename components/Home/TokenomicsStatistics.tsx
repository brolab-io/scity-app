import clsx from "clsx";
import SvgInfo from "../Icons/SvgInfo";
import ProgressBar from "../UI/ProgressBar";
import styles from "./TokenomicsStatistics.module.css";

const TokenomicsStatistics = () => {
  const statics = [
    {
      title: "Seed Round",
      percent: 3,
      value: "30.000.000",
      color: "#855DCF",
    },
    {
      title: "Strategic Sale",
      percent: 6,
      value: "60.000.000",
      color: "#2DD58E",
    },
    {
      title: "IDO/Public Sale",
      percent: 1,
      value: "10.000.000",
      color: "#FFFF00",
    },
    {
      title: "Add liquidity",
      percent: 1,
      value: "10.000.000",
      color: "#1AC4FF",
    },
    {
      title: "MKT team",
      percent: 5,
      value: "50.000.000",
      color: "#9F19AB",
    },
    {
      title: "Development Team",
      percent: 10,
      value: "100.000.000",
      color: "#E13333",
    },
    {
      title: "Advisor",
      percent: 5,
      value: "50.000.000",
      color: "#FF7699",
    },
    {
      title: "Play to Earn",
      percent: 30,
      value: "300.000.000",
      color: "#D335EB",
    },
    {
      title: "Staking",
      percent: 35,
      value: "350.000.000",
      color: "#1AB9B9",
    },
    {
      title: "Referral/Airdrop/Community Rewards",
      percent: 4,
      value: "40.000.000",
      color: "#FFA43E",
    },
  ];
  return (
    <div className={clsx("max-w-screen-xl px-4 sm:px-6 mx-auto relative")}>
      <div className={clsx("py-10", styles.bg)}>
        <div className="text-center">
          <h3 className="font-bold text-white text-[24px] lg:text-[28px]">Tokenomics Statistics</h3>
        </div>
        <div className="mt-8 space-y-6">
          {statics.map((stat, index) => (
            <div className="flex px-4 md:px-6 lg:px-8 xl:px-10" key={index}>
              <div className="flex w-1/2 space-x-4 md:space-x-8 lg:space-x-12 items-center">
                <span className="truncate text-[12px] md:text-[15px] lg:text-[18px] text-[#A0AEC0] w-7/12 lg:w-2/6">
                  {stat.title}
                </span>
                <span
                  className={clsx(
                    "text-white text-[14px] w-5/12 text-right min-w-[76px]",
                    "md:text-[19px]",
                    "lg:text-[24px] lg:w-2/6"
                  )}
                >
                  {stat.value}
                </span>
                <span className="hidden lg:block text-white truncate text-[24px]">
                  {stat.percent}%
                </span>
              </div>
              <div className="flex items-center w-1/2 pl-4 space-x-4">
                <ProgressBar
                  percentage={stat.percent}
                  className="h-[8px] md:h-[12px] lg:h-[16px]"
                  color={stat.color}
                />
                <SvgInfo className="hidden lg:block" />
                <span className="lg:hidden text-white truncate text-[14px] w-12 text-right">
                  {stat.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsStatistics;
