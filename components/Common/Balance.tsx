import useBalance from "../../hooks/useBalance";

export default function Balance() {
  const { balance } = useBalance();

  return (
    <div className="flex items-center px-4 py-2 space-x-1">
      <span className="text-sm font-semibold text-primary">
        {/* {balance === null ? "Error" : balance ? `${formatEther(balance)}` : ""} */}
        My NFT: {balance}
      </span>
    </div>
  );
}
