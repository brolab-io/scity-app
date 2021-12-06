import clsx from "clsx";
import Container from "../UI/Container";
import ProgressBar from "../UI/ProgressBar";

const TokenomicsStatistics = () => {
  const statics = [
    {
      title: "Seed Round",
      percent: 3,
      value: "30.000.000",
      color: "#E250E5",
    },
    {
      title: "Strategic Sale",
      percent: 6,
      value: "60.000.000",
      color: "#E250E5",
    },
    {
      title: "IDO/Public Sale",
      percent: 1,
      value: "10.000.000",
      color: "#E250E5",
    },
    {
      title: "Add liquidity",
      percent: 1,
      value: "10.000.000",
      color: "#E250E5",
    },
    {
      title: "MKT team",
      percent: 5,
      value: "50.000.000",
      color: "#E250E5",
    },
    {
      title: "Development Team",
      percent: 10,
      value: "100.000.000",
      color: "#E250E5",
    },
    {
      title: "Advisor",
      percent: 5,
      value: "50.000.000",
      color: "#E250E5",
    },
    {
      title: "Play to Earn",
      percent: 30,
      value: "300.000.000",
      color: "#E250E5",
    },
    {
      title: "Staking",
      percent: 35,
      value: "350.000.000",
      color: "#E250E5",
    },
    {
      title: "Referral/Airdrop/Community Rewards",
      percent: 4,
      value: "40.000.000",
      color: "#E250E5",
    },
  ];
  return (
    <Container>
      <div className="py-12 rounded-none bg-dark-gray xl:rounded-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white lg:text-2xl">Tokenomics Statistics</h3>
        </div>

        <div className="mt-12 space-y-7">
          {statics.map((stat, index) => (
            <div className="grid md:grid-cols-2 gap-y-4" key={index}>
              <div className="flex flex-wrap items-center justify-between px-12 md:flex-row">
                <span className="truncate w-52 text-light-gray">{stat.title}</span>
                <span className="text-white truncate">{stat.value}</span>
                <div className="flex flex-wrap">
                  <span className="text-white truncate">{stat.percent}%</span>
                </div>
              </div>
              <div className="px-12 md:px-0 md:pr-12">
                <ProgressBar percentage={stat.percent} className="h-5" color={stat.color} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TokenomicsStatistics;
