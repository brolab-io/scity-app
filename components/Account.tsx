import { useWeb3React } from "@web3-react/core";

export default function Account() {
  const { account } = useWeb3React();

  return (
    <div className="flex items-center rounded-xl px-5 py-2 bg-primary text-white">
      <span className="font-semibold text-sm">
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
