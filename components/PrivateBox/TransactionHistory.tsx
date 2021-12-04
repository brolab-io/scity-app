import { DOMAttributes } from "react";

const formatDate = (date: Date, nomal?: boolean) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const timezone = date.getTimezoneOffset() / 60;
  const timezoneSign = timezone > 0 ? "-" : "+";
  if (nomal) {
    return `${hour}:${minute} GMT${timezoneSign}${Math.abs(timezone)} ${day}/${month}`;
  }
  return `${hour}:${minute}:${second} GMT${timezoneSign}${Math.abs(
    timezone
  )} ${day}/${month}/${year}`;
};

type Props = {
  histories: { buyer: string; buyTime: number }[];
};

const PrivateBoxTransactionHistory: React.FC<Props> = ({ histories }) => {
  const onScroll: DOMAttributes<HTMLDivElement>["onScroll"] = (event) => {
    console.log(Object.keys(event.target));
  };
  return (
    <div className="w-full p-6 mt-2 rounded-lg xl:rounded-xl bg-dark-gray bg-opacity-80 lg:p-8 md:mt-4 lg:mt-10">
      <div className="text-center text-white">
        <h2 className="text-2xl font-medium text-gray-300 lg:text-3xl">HISTORY</h2>
      </div>
      <div className="mt-4 space-y-1.5 max-h-72 overflow-y-scroll pr-4" onScroll={onScroll}>
        {histories.map(({ buyer, buyTime }, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-300 lg:text-base">
            <span>
              {buyer.substr(0, 6)}...{buyer.substr(buyer.length - 4)}
            </span>
            <span className="md:hidden">{formatDate(new Date(buyTime * 1000), true)}</span>
            <span className="hidden md:block">{formatDate(new Date(buyTime * 1000))}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateBoxTransactionHistory;
