import { utils } from "near-api-js";
import { useNearContext } from "../NearContext";

export default function Balance() {
  const { balance } = useNearContext();
  console.log(utils.format.parseNearAmount("0.1"));

  return (
    <div className="flex items-center px-4 py-2 space-x-1">
      <span className="text-sm font-semibold text-primary">
        {/* {balance === null ? "Error" : balance ? `${formatEther(balance)}` : ""} */}
        Balance: {utils.format.formatNearAmount(balance, 3)} Near
      </span>
    </div>
  );
}
