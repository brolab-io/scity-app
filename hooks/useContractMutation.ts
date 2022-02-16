import { useEtherContext } from "../components/EtherContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDeepCompareMemoize } from "use-deep-compare-effect";
import { ContractTypes } from "../dapp/config";
import { ContractTransaction } from "ethers";

type Options = {
  enabled?: boolean;
  onSuccess?: (data: ContractTransaction) => void;
  pipes?: any[];
};

type StateValues = {
  isLoading: boolean;
  error: any;
  data: any;
};

const useContractMutation = (
  contractType: ContractTypes,
  method: string,
  args: any[] = [],
  options: Options = {}
) => {
  const memoizedOptions = useDeepCompareMemoize(options);
  const memoizedArgs = useDeepCompareMemoize(args);

  const mountedRef = useRef(true);

  const [state, setState] = useState<StateValues>({
    isLoading: false,
    error: null,
    data: null,
  });

  const patchState = useCallback((newState: Partial<StateValues>) => {
    if (mountedRef.current) {
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
    }
  }, []);

  const { getContract } = useEtherContext();

  const callContract = useCallback(async () => {
    const { enabled } = memoizedOptions;

    // Skip if disabled
    if (enabled === false) {
      return;
    }

    console.log(`CallContract: ${contractType} ${method}`, memoizedArgs);

    const contract = getContract(contractType, true);
    if (!contract[method]) {
      throw new Error(`Contract method ${method} not found`);
    }

    patchState({ isLoading: true });

    try {
      let result: ContractTransaction = await contract[method](...memoizedArgs);
      if (memoizedOptions.pipes) {
        memoizedOptions.pipes.forEach(async (pipe) => {
          result = await Promise.resolve(pipe(result));
        });
      }
      if (memoizedOptions.onSuccess) {
        memoizedOptions.onSuccess(result);
      }
      patchState({ data: result, isLoading: false });
      return result;
    } catch (error) {
      console.warn(`Error calling contract ${contractType} ${method}`, error);
      patchState({ error, isLoading: false });
    }
  }, [
    contractType,
    method,
    getContract,
    patchState,
    memoizedArgs,
    memoizedOptions,
  ]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useMemo(
    () => ({
      ...state,
      mutate: callContract,
    }),
    [state, callContract]
  );
};

export default useContractMutation;
