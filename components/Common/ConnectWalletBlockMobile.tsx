import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import NavbarAccountPopover from "./NavbarAccountPopover";
import clsx from "clsx";
import Balance from "./Balance";
import Account from "./Account";
import Connect from "./Connect";
import Clickable from "../UI/Clickable";

const ConnectWalletBlockMobile = () => {
  const { active } = useWeb3React<Web3Provider>();
  return active ? (
    <div className="relative flex flex-none group">
      <Clickable href="/inventory">
        <Account />
      </Clickable>
      <div
        className={clsx(
          "absolute top-9 skew-x-0 right-2 z-10 transform duration-200 w-76",
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
    <Connect />
  );
};

export default ConnectWalletBlockMobile;
