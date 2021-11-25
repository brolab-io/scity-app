import { useWeb3React } from "@web3-react/core";

import Account from "./Account";
import Balance from "./Balance";
import ChainId from "./ChainId";
import Connect from "./Connect";

export function Header() {
  const { active, error } = useWeb3React();

  return (
    <div className="flex w-full justify-between py-5">
      <h1>CityLand</h1>
      {active ? (
        <div className="flex-none hidden px-2 mx-2 lg:flex">
          <div className="flex items-stretch rounded-xl shadow">
            <Balance />
            <Account />
          </div>
        </div>
      ) : (
        <Connect />
      )}
    </div>
  );
}
