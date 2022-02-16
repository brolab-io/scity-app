import { callPublicRpc } from "./../components/EtherContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDeepCompareEffect, {
  useDeepCompareMemoize,
} from "use-deep-compare-effect";
import { ContractTypes } from "../dapp/config";

type Options = {
  enabled?: boolean;
};

type StateValues = {
  isLoading: boolean;
  error: any;
  data: any;
};

const useContractRPC = (
  contractType: ContractTypes,
  method: string,
  args: any[],
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

  const callContract = useCallback(async () => {
    const { enabled } = memoizedOptions;

    // Skip if disabled
    if (enabled === false) {
      return;
    }

    console.log(`Call Contract RPC: ${contractType} ${method}`, memoizedArgs);

    patchState({ isLoading: true });

    try {
      const result = await callPublicRpc(contractType, method, ...memoizedArgs);
      patchState({ data: result, isLoading: false });
    } catch (error) {
      console.warn(`Error calling contract ${contractType} ${method}`, error);
      patchState({ error, isLoading: false });
    }
  }, [memoizedOptions, contractType, method, memoizedArgs, patchState]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useDeepCompareEffect(() => {
    callContract();
  }, [callContract]);

  return useMemo(
    () => ({
      ...state,
      refetch: callContract,
    }),
    [state, callContract]
  );
};

export default useContractRPC;
