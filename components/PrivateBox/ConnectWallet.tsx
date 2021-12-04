import clsx from "clsx";
import Account from "../Common/Account";
import Balance from "../Common/Balance";
import Connect from "../Common/Connect";
import Clickable from "../UI/Clickable";
import NavbarAccountPopover from "../Common/NavbarAccountPopover";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const PrivateBoxConnectWallet = ({}) => {
  const { active, account } = useWeb3React<Web3Provider>();
  return (
    <div className="relative top-0 left-0 right-0 z-30 flex items-center justify-center lg:fixed lg:left-auto">
      <div className="px-10 py-3">
        {active ? (
          <div className="relative flex-none group">
            <div
              className={clsx(
                "flex items-stretch duration-100 ease-out transform shadow-md rounded-xl hover:shadow-lg z-20"
              )}
            >
              <div className="flex items-center px-5 py-2.5 rounded-xl bg-primary">
                <span className="space-x-1 text-sm font-semibold">
                  <span className="text-white">Connected:</span>
                  <span className="text-gray-100">
                    {account === null
                      ? "-"
                      : account
                      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                      : ""}
                  </span>
                </span>
              </div>
            </div>
            <div
              className={clsx(
                "absolute top-9 skew-x-0 right-0 z-10 transform duration-200 w-76",
                "opacity-0 invisible",
                "group-hover:opacity-100 group-hover:visible"
              )}
            >
              <div className="bg-opacity-0 h-7"></div>
              <div className="border rounded-lg bg-dark border-primary">
                <NavbarAccountPopover />
              </div>
            </div>
          </div>
        ) : (
          <Connect outline />
        )}
      </div>
    </div>
  );
};

export default PrivateBoxConnectWallet;
