import { useWeb3React } from "@web3-react/core";

export default function Account() {
  const { account } = useWeb3React();

  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
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
