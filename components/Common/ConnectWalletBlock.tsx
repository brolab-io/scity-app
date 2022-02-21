import NavbarAccountPopover from "./NavbarAccountPopover";
import clsx from "clsx";
import Connect from "./Connect";
import Clickable from "../UI/Clickable";
import { useNearContext } from "../NearContext";
import Account from "./Account";
import Balance from "./Balance";

const ConnectWalletBlock = () => {
  const { isSignedIn } = useNearContext();
  return isSignedIn ? (
    <div className="relative flex flex-none group lg:flex">
      <Clickable href="/inventory">
        <a
          className={clsx(
            "flex items-stretch duration-100 ease-out transform bg-white shadow-md rounded-full hover:shadow-lg z-20 overflow-hidden"
          )}
        >
          <Balance />
          <Account />
        </a>
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

export default ConnectWalletBlock;
