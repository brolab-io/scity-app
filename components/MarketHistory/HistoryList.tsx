import { useMemo } from "react";

const MarketHistoryList = () => {
  const histories = useMemo(() => {
    return new Array(10).fill(0).map((_, index) => {
      return {
        id: index,
        name: `#${(index + 1).toString().padStart(3, "0")} Transport`,
        date: new Date(),
        amount: index,
        price: "650.023",
        status: "Bought",
      };
    });
  }, []);
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-[#718096] font-medium text-[16px]">
            <th className="py-3 text-left">NFT</th>
            <th className="py-3 text-right">Price (SCC)</th>
            <th className="py-3 text-right">Time</th>
            <th className="py-3 text-right">Status</th>
            <th className="py-3 text-right">Operate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-solid divide-[#2D3748]">
          {histories.map((history) => (
            <tr key={history.id}>
              <td className="text-white font-medium text-[16px] py-3">{history.name}</td>
              <td className="text-white font-medium text-[16px] py-3 text-right">
                {history.price}
              </td>
              <td className="text-white font-medium text-[16px] py-3 text-right">
                {history.date.toLocaleString()}
              </td>
              <td className="text-magenta font-medium text-[16px] py-3 text-right">
                {history.status}
              </td>
              <td className="text-white font-medium text-[16px] py-3 flex justify-end">
                <button className="py-2.5 rounded-2xl button button-info">
                  <span className="text-[12px] md:text-[14px] lg:text-[16px]">More Info</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketHistoryList;
