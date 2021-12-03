import useBalanceOf from "../../hooks/useBalanceOf";
import { ContractTypes } from "../EtherContext";

export default function Balance() {
  const { balance } = useBalanceOf(ContractTypes.LAND);

  return (
    <div className="flex items-center px-4 py-2 space-x-1">
      <span className="text-sm font-semibold text-primary">
        {/* {balance === null ? "Error" : balance ? `${formatEther(balance)}` : ""} */}
        My NFT: {balance}
      </span>
    </div>
  );
}
