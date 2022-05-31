import { useWallet } from "@solana/wallet-adapter-react";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";
import { useCurrentUser } from "contexts/currentUser";
import { shortenAddress } from "lib";
import { useCallback } from "react";

import { Button } from "components/Button";
import { renderNotification } from "components/Notification";

import { get, post } from "lib/http";

export function ConnectWalletButton({ type = "primary" }) {
  const { wallet, signMessage, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { refreshCurrentUser } = useCurrentUser();

  const getNonce = async () => {
    const { nonce } = await get("/api/nonce");
    return nonce;
  };

  const handleConnect = useCallback(async () => {
    if (signMessage && publicKey) {
      const nonce = await getNonce();
      const message = `Sign this message to connect your wallet.\n\nNonce: ${nonce}`;
      const encodedMessage = new TextEncoder().encode(message);

      try {
        const signedMessage = await signMessage(encodedMessage!);
        await post("/api/nonce", {
          publicKey: publicKey.toString(),
          signature: bs58.encode(signedMessage),
        });

        await refreshCurrentUser();

        renderNotification({
          title: "Successfully connected your wallet",
          description: `Wallet with public key ${shortenAddress(
            publicKey.toString()
          )} was added`,
        });
      } catch (e) {
        renderNotification({
          title: "Wallet signature rejected",
        });
      }
    }
  }, [signMessage, publicKey, refreshCurrentUser]);

  if (!wallet) {
    return (
      <Button block type={type} onClick={() => setVisible(true)}>
        Select a Wallet
      </Button>
    );
  }

  return (
    <Button block type={type} onClick={handleConnect}>
      Connect Wallet
    </Button>
  );
}
