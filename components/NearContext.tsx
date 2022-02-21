import { ContractTypes, CONTRACTS, getNearConfig } from "../dapp/near.config";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect, ConnectedWalletAccount, Contract, Near, WalletConnection } from "near-api-js";

type NearContract = {
  [key: string]: (params: any) => Promise<any>;
} & Contract;

type Context = {
  walletConnection: WalletConnection | null;
  isSignedIn: boolean | undefined;
  getContract: (contractName: keyof typeof CONTRACTS) => Promise<NearContract | null>;
  account: ConnectedWalletAccount | undefined;
  signIn: () => Promise<void> | undefined;
  balance: string;
  near: Near | null;
};

type Contracts = {
  [key in keyof typeof CONTRACTS]: NearContract | undefined;
};

const NearContext = createContext({} as Context);

export const useNearContext = () => useContext(NearContext);

const NearContextProvider: React.FC = ({ children }) => {
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);
  const { current: contracts } = useRef({} as Contracts);
  const [balance, setBalance] = useState("");
  const [near, setNear] = useState<Near | null>(null);

  const isSignedIn = useMemo(() => walletConnection?.isSignedIn(), [walletConnection]);
  const account = useMemo(() => walletConnection?.account(), [walletConnection]);

  const initWalletConnection = useCallback(async () => {
    if (typeof window !== undefined) {
      const config = getNearConfig();
      const near = await connect(config);
      setNear(near);
      setWalletConnection(new WalletConnection(near, null));
    }
  }, []);

  const getContract = useCallback(
    async (contractAddress: keyof typeof CONTRACTS) => {
      // Return cached contract if it exists
      if (contracts[contractAddress] !== undefined) {
        return contracts[contractAddress] as NearContract;
      }

      // Create new contract and cache it
      if (walletConnection) {
        const contract = new Contract(walletConnection.account(), contractAddress, {
          viewMethods: CONTRACTS[contractAddress].viewMethods as any,
          changeMethods: CONTRACTS[contractAddress].changeMethods as any,
        }) as NearContract;
        contracts[contractAddress] = contract;
        return contract;
      }
      return null;
    },
    [contracts, walletConnection]
  );

  const signIn = useCallback(() => {
    if (walletConnection) {
      return walletConnection.requestSignIn({
        successUrl: window.location.href,
        failureUrl: window.location.href,
      });
    }
  }, [walletConnection]);

  useEffect(() => {
    if (account) {
      account.getAccountBalance().then((balance) => {
        setBalance(balance.total);
      });
    }
  }, [account]);

  useEffect(() => {
    initWalletConnection();
  }, [initWalletConnection]);

  const contextValue = useMemo(
    () => ({ getContract, isSignedIn, walletConnection, account, signIn, balance, near }),
    [getContract, walletConnection, isSignedIn, account, signIn, balance, near]
  );

  return <NearContext.Provider value={contextValue}>{children}</NearContext.Provider>;
};

export default NearContextProvider;
