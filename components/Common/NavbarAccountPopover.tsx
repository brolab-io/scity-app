import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import SvgIconCopy from "../Icons/SvgIconCopy";
import Clickable from "../UI/Clickable";
import SvgIconLogout from "../Icons/SvgIconLogout";
import SvgIconExternalLink from "../Icons/SvgIconExternalLink";
import { useCallback } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { getMetaMaskNetworks } from "../../dapp/config";

const metaMaskNetworks = getMetaMaskNetworks();

const AccountModal: React.FC = () => {
  const { account, deactivate } = useWeb3React<Web3Provider>();

  const onClickLogout = useCallback(async () => {
    deactivate();
  }, [deactivate]);

  const onClickCopy = useCallback(() => {
    return navigator.clipboard.writeText(account!);
  }, [account]);

  if (!account) {
    return null;
  }
  return (
    <div className="divide-y divide-gray-700">
      <div className="p-5 space-y-1.5">
        <div className="flex justify-between px-4 py-2 text-sm truncate rounded-lg bg-light-gray">
          <span className="font-medium">
            {`${account.substring(0, 13)}...${account.substring(account.length - 13)}`}
          </span>
          <Clickable onClick={onClickCopy}>
            <SvgIconCopy className="w-4 h-4 cursor-pointer fill-current hover:text-blue-700" />
          </Clickable>
        </div>
        <div className="flex justify-center">
          <Link passHref href={`${metaMaskNetworks[0].blockExplorerUrls[0]}/address/${account}`}>
            <a target="_blank" className="flex items-center text-sm text-blue-600">
              <span>View on BSCScan</span>
              <SvgIconExternalLink className="w-4 h-4 ml-1 -mt-1 fill-current" />
            </a>
          </Link>
        </div>
      </div>
      <div className="px-5 py-2">
        <Clickable
          onClick={onClickLogout}
          className="flex items-center px-2 py-1 font-medium text-red-800 hover:text-red-600"
        >
          <SvgIconLogout className="w-4 h-4 mr-1.5 fill-current" />
          <span>Logout</span>
        </Clickable>
      </div>
    </div>
  );
};

export default AccountModal;
