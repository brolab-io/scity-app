import { useWeb3React } from "@web3-react/core";

export default function Account() {
  const { account } = useWeb3React();

  return (
    <div className="flex items-center px-5 py-2 rounded-xl bg-primary">
      <span className="text-sm font-semibold text-white">
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ""}
      </span>
    </div>
  );
}
