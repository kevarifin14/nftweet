import {
  bundlrStorage,
  keypairIdentity,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js-next";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export const useMetaplex = () => {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const metaplex = useMemo(() => {
    const instance = new Metaplex(connection).use(
      walletAdapterIdentity(wallet?.adapter!)
    );
    if (process.env.NODE_ENV === "development") {
      instance.use(
        bundlrStorage({
          address: "https://devnet.bundlr.network",
          providerUrl: "https://api.devnet.solana.com",
          timeout: 60000,
        })
      );
    }

    return instance;
  }, [connection, wallet?.adapter]);

  return metaplex;
};
