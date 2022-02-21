import { ContractTypes, CONTRACTS } from "../dapp/near.config";
import { useNearContext } from "../components/NearContext";
import { useCallback, useMemo, useState } from "react";

const useNearContractMutation = <T, K extends ContractTypes = ContractTypes>(
  contractName: K,
  method: typeof CONTRACTS[K]["changeMethods"][number]
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const { getContract } = useNearContext();

  const mutate = useCallback(
    async (params: any = {}) => {
      const contract = await getContract(contractName);
      if (!contract) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log("Calling method:", method, params);
        return contract[method]({
          ...params,
          callbackUrl: window.location.href,
        });
      } catch (error) {
        console.warn(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [contractName, getContract, method]
  );

  return useMemo(
    () => ({
      isLoading,
      error,
      mutate,
    }),
    [error, mutate, isLoading]
  );
};

export default useNearContractMutation;
