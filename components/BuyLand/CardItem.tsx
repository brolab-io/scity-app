import Image from "next/image";

type Props = {};

const Card: React.FC<Props> = () => {
  return (
    <div className="bg-dark rounded-xl p-6 space-y">
      <Image
        width={247 * 2}
        height={311 * 2}
        alt="card"
        src="/images/card.png"
      />
      <div className="py-1 mt-4 md:mt-2 lg:mt-1">
        <span className="lg:text-lg font-semibold text-white">
          TORONTO CITY - A
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-light-gray">Probability</span>
        <span className="text-white text-sm">6.5%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-light-gray">Supply</span>
        <span className="text-white text-sm">478</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-light-gray">Hashrate</span>
        <span className="text-gradient bg-gradient-to-bl text-sm">x1000</span>
      </div>
    </div>
  );
};

export default Card;
