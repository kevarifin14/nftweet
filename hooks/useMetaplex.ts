import {
  bundlrStorage,
  keypairIdentity,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js-next";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const useMetaplex = () => {
  const { connection } = useConnection();
  const { wallet } = useWallet();
  return new Metaplex(connection)
    .use(walletAdapterIdentity(wallet?.adapter!))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );
};
