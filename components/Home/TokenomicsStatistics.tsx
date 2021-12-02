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
      <div className="py-12 bg-dark-gray rounded-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white lg:text-2xl">Tokenomics Statistics</h3>
        </div>
        <div className="mt-12 space-y-2">
          {statics.map((stat, index) => (
            <div key={index} className="flex items-center px-12 space-x-8 md:flex-row">
              <span className="truncate w-52 text-light-gray">{stat.title}</span>
              <div className="flex justify-end w-24">
                <span className="text-white truncate">{stat.value}</span>
              </div>
              <span className="w-24 text-white truncate">{stat.percent}%</span>
              <div className="flex flex-1 ">
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
