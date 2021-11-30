import { useAppContext } from "../components/AppContext";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCompanies = () => {
  const { account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<string[]>([]);
  const { companyContract } = useAppContext();

  const getBalance = useCallback(async () => {
    if (!companyContract || !account) {
      setCompanies([]);
      return;
    }
    setIsLoading(true);
    try {
      const _companiesToken: ethers.BigNumber[] =
        await companyContract.tokensOfOwner(account);
      const _companiesURIPromises = _companiesToken.map((_companyTokenId) =>
        companyContract.tokenURI(_companyTokenId)
      );
      const _companiesURI = await Promise.all(_companiesURIPromises);
      setCompanies(_companiesURI);
    } catch (error: any) {
      toast.error(error.data?.message ?? error.message);
    } finally {
      setIsLoading(false);
    }
  }, [account, companyContract]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { companies, reload: getBalance, isLoading };
};

export default useCompanies;
