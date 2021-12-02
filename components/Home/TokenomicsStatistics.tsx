import clsx from "clsx";
import Container from "../UI/Container";
import ProgressBar from "../UI/ProgressBar";

const TokenomicsStatistics = () => {
  const statics = [
    {
      title: "Farms & Pools Rewards",
      value: "80.000.000",
      percent: 70,
      color: "#E764F6",
    },
    {
      title: "Farms & Pools Rewards",
      value: "10.00.000",
      percent: 2,
      color: "#F8F228",
    },
    {
      title: "Team & Advisors",
      value: "10.000.000",
      percent: 13,
      color: "#FFA53C",
    },
    {
      title: "Team & Advisors",
      value: "10.000.000",
      percent: 15,
      color: "#2CD48D",
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
              <div className="px-12 md:px-0">
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
