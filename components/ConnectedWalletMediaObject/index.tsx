import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "lib";

import { MediaObject, MediaObjectProps } from "components/MediaObject";

interface WalletMediaObjectProps extends Partial<MediaObjectProps> {
  title?: string;
}

export function ConnectedWalletMediaObject({
  className,
  size,
  vertical,
  title,
  description,
}: WalletMediaObjectProps) {
  const { wallet, publicKey, connected } = useWallet();
  let shortenedAddress = shortenAddress(publicKey?.toString()!);

  return (
    <MediaObject
      src={wallet?.adapter.icon}
      title={title || shortenedAddress}
      description={
        description || description === ""
          ? description
          : connected
          ? "Connected"
          : "Not Connected"
      }
      className={className}
      size={size}
      vertical={vertical}
    />
  );
}
