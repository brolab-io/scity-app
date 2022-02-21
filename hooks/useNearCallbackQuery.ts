import { useEffect } from "react";
import { useDeepCompareMemoize } from "use-deep-compare-effect";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useNearContext } from "../components/NearContext";

const useNearCallbackQuery = (successCallback: (...args: any[]) => any) => {
  const router = useRouter();
  const { query, push, pathname } = router;
  const { getContract, near } = useNearContext();

  const memoizedQuery = useDeepCompareMemoize(query);

  useEffect(() => {
    // FJYBqid1mYf659bBH9mKES1SEhsYBCXbumhJzvEUYAHd
    const { errorMessage, transactionHashes } = memoizedQuery;
    if (errorMessage) {
      toast(
        `Error: ${decodeURI(
          Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
        )}`,
        {
          type: "error",
        }
      );
      push(pathname);
    }

    if (near && transactionHashes) {
      push("/my-asset");
      // provider
      //   .txStatusReceipts(transactionHash, "land.scity.testnet")
      //   .then(console.log);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedQuery, push, pathname, getContract]);
};

export default useNearCallbackQuery;
