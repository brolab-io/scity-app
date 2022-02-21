import { useEtherContext } from "./../components/EtherContext";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ContractTypes } from "../dapp/bsc.config";

type CompanyData = {
  companyTokenURIs: string[];
  isFetchingCompanyTokenURIs: boolean;
  totalBoxes: string;
  isFetchingTotalBoxes: boolean;
  openedBoxURI: string;
  openningBox: boolean;
};

const useCompanyContract = (enableFetchCompanies: boolean) => {
  const { account } = useWeb3React();
  const { getContract } = useEtherContext();

  const [data, setData] = useState<CompanyData>({
    companyTokenURIs: [],
    isFetchingCompanyTokenURIs: false,
    totalBoxes: "0",
    isFetchingTotalBoxes: false,
    openedBoxURI: "",
    openningBox: false,
  });

  const getTotalBoxes = useCallback(async () => {
    if (!account) {
      setData((prevData) => ({ ...prevData, totalBoxes: "0" }));
      return;
    }
    setData((prevData) => ({ ...prevData, isFetchingTotalBoxes: true }));
    try {
      const contract = getContract(ContractTypes.BOX);
      const totalBoxes = await contract.balanceOf(account);
      setData((prevData) => ({
        ...prevData,
        isFetchingTotalBoxes: false,
        totalBoxes: ethers.utils.formatEther(totalBoxes),
      }));
    } catch (error) {
      console.error(`Error fetching total boxes:`, error);
      setData((prevData) => ({ ...prevData, isFetchingTotalBoxes: false }));
    }
  }, [account, getContract]);

  const getCompanies = useCallback(async () => {
    if (!account) {
      setData((prevData) => ({ ...prevData, companyTokenURIs: [] }));
      return;
    }
    setData((prevData) => ({ ...prevData, isFetchingCompanyTokenURIs: true }));
    try {
      const contract = getContract(ContractTypes.COMPANY, true);
      const companyTokenIds: ethers.BigNumber[] = await contract.tokensOfOwner(
        account
      );
      const companiesURIPromises = companyTokenIds.map((companyTokenId) =>
        contract.tokenURI(companyTokenId)
      );
      const companyTokenURIs: string[] = await Promise.all(
        companiesURIPromises
      );
      setData((prevData) => ({
        ...prevData,
        isFetchingCompanyTokenURIs: false,
        companyTokenURIs,
      }));
    } catch (error: any) {
      setData((prevData) => ({
        ...prevData,
        isFetchingCompanyTokenURIs: false,
      }));
      toast.error(error.data?.message ?? error.message);
    }
  }, [account, getContract]);

  const openBox = useCallback(async () => {
    setData((prevData) => ({ ...prevData, openningBox: true }));
    try {
      const contract = getContract(ContractTypes.COMPANY, true);
      const contractTx: ethers.ContractTransaction = await contract.openBox();
      const contractReceipt: ethers.ContractReceipt = await contractTx.wait();
      const buyLandEvent = contractReceipt?.events?.find(
        (event: ethers.Event) => event.event === "OpenBox"
      );
      const [, tokenId] = buyLandEvent?.args || [];
      const openedBoxURI = await contract.tokenURI(tokenId);
      setData((prevData) => ({
        ...prevData,
        openningBox: false,
        openedBoxURI: openedBoxURI,
      }));
      return getTotalBoxes();
    } catch (error: any) {
      setData((prevData) => ({ ...prevData, openningBox: false }));
      toast.error(error.data?.message ?? error.message);
    }
  }, [getContract, getTotalBoxes]);

  useEffect(() => {
    getTotalBoxes();
  }, [getTotalBoxes]);

  useEffect(() => {
    if (enableFetchCompanies) {
      getCompanies();
    }
  }, [enableFetchCompanies, getCompanies]);

  return useMemo(
    () => ({ ...data, getCompanies, openBox }),
    [data, getCompanies, openBox]
  );
};

export default useCompanyContract;
