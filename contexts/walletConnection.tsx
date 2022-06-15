import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode, useMemo } from "react";

import { IS_PRODUCTION } from "lib/analytics";

type WalletConnectionProviderProps = {
  children: ReactNode;
};

export function WalletConnectionProvider({
  children,
}: WalletConnectionProviderProps) {
  const network =
    process.env.NODE_ENV === "development"
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(
    () =>
      IS_PRODUCTION
        ? "https://falling-withered-water.solana-mainnet.quiknode.pro/94ebe618ceec1f234f1d9346693e89feaf3bf3a7/"
        : clusterApiUrl(network),
    [network]
  );

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{
        commitment: "finalized",
        confirmTransactionInitialTimeout: 60000,
      }}
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
