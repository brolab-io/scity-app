import { ContractTypes, CONTRACTS } from "../dapp/near.config";
import { useNearContext } from "../components/NearContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDeepCompareMemoize } from "use-deep-compare-effect";

type Config<T = unknown> = {
  initValue?: T;
  enabled?: boolean;
};

const useNearContractQuery = <T, K extends ContractTypes = ContractTypes>(
  contractName: K,
  method: typeof CONTRACTS[K]["viewMethods"][number],
  params?: any,
  config?: Config<T>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<T | null>(config?.initValue ?? null);

  const memoizedConfig = useDeepCompareMemoize(config);
  const memoizedParams = useDeepCompareMemoize(params);

  const { getContract } = useNearContext();

  const fetch = useCallback(async () => {
    console.log("config", memoizedConfig);
    if (memoizedConfig) {
      if ("enabled" in memoizedConfig && !memoizedConfig.enabled) {
        return;
      }
    }

    const contract = await getContract(contractName);
    if (!contract) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log("Calling method:", method, memoizedParams);
      const responseData = await contract[method](memoizedParams);
      console.log(`Response of ${method}:`, responseData);
      setData(responseData);
    } catch (error) {
      console.warn(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [contractName, getContract, method, memoizedConfig, memoizedParams]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
      refetch: fetch,
    }),
    [data, error, fetch, isLoading]
  );
};

export default useNearContractQuery;
