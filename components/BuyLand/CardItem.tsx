import Image from "next/image";

type Props = {};

const CardItem: React.FC<Props> = () => {
  return (
    <div className="p-6 bg-dark rounded-xl space-y">
      <Image
        width={247 * 2}
        height={311 * 2}
        alt="card"
        src="/images/card.png"
      />
      <div className="py-1 mt-4 md:mt-2 lg:mt-1">
        <span className="font-semibold text-white lg:text-lg">
          TORONTO CITY - A
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-light-gray">Probability</span>
        <span className="text-sm text-white">6.5%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-light-gray">Supply</span>
        <span className="text-sm text-white">478</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-light-gray">Hashrate</span>
        <span className="text-sm text-gradient bg-gradient-to-bl">x1000</span>
      </div>
    </div>
  );
};

export default CardItem;
