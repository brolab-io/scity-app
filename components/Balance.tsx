import { useWeb3React } from "@web3-react/core";
import useBalance from "../hooks/useBalance";

export default function Balance() {
  const { balance } = useBalance();

  return (
    <div className="flex items-center space-x-1 px-4 py-2">
      <span className="font-semibold text-sm text-primary">
        {/* {balance === null ? "Error" : balance ? `${formatEther(balance)}` : ""} */}
        My NFT: {balance}
      </span>
    </div>
  );
}
