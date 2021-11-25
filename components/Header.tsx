import { useWeb3React } from "@web3-react/core";

import Account from "./Account";
import Balance from "./Balance";
import Clickable from "./Clickable";
import Connect from "./Connect";

export function Header() {
  const { active, error } = useWeb3React();

  return (
    <div className="flex h-20 w-full justify-between items-center">
      <h1 className="text-primary">City Land</h1>
      {active ? (
        <div className="flex-none hidden px-2 mx-2 lg:flex">
          <Clickable className="flex items-stretch rounded-xl shadow-md transform ease-out duration-100 hover:shadow-lg hover:scale-105">
            <Balance />
            <Account />
          </Clickable>
        </div>
      ) : (
        <Connect />
      )}
    </div>
  );
}
