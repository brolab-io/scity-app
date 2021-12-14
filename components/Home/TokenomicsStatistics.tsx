import clsx from "clsx";
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
    <div className={clsx("max-w-screen-xl mx-auto relative", styles.bg)}>
      <div className="py-10">
        <div className="text-center">
          <h3 className="font-bold text-white text-[24px] lg:text-[28px]">Tokenomics Statistics</h3>
        </div>
        <div className="mt-8 space-y-7">
          {statics.map((stat, index) => (
            <div className="grid md:grid-cols-2 gap-y-4" key={index}>
              <div className="grid px-12 md:grid-cols-2">
                <span className="w-full truncate text-[18px] text-[#A0AEC0] mt-1.5">
                  {stat.title}
                </span>
                <div className="flex">
                  <div className="flex flex-1 md:justify-end">
                    <span className="text-white truncate text-[24px]">{stat.value}</span>
                  </div>
                  <div className="flex justify-end flex-1">
                    <span className="text-white truncate text-[24px]">{stat.percent}%</span>
                  </div>
                </div>
              </div>
              <div className="px-12 md:px-0 md:pr-12 mt-2.5">
                <ProgressBar percentage={stat.percent} className="h-[16px]" color={stat.color} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsStatistics;
