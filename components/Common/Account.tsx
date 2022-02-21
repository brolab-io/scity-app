import { useNearContext } from "../NearContext";

export default function Account() {
  const { account } = useNearContext();

  return (
    <div className="flex items-center px-5 py-2.5 rounded-full bg-magenta">
      <span className="text-sm font-semibold text-white">{account?.accountId}</span>
    </div>
  );
}
