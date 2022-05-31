import { PublicKey } from "@solana/web3.js";
import {
  shortenAddress,
  viewAccountOnExplorer,
  viewAccountOnSolScan,
} from "lib";

import { renderNotification } from "components/Notification";
import { Tooltip } from "components/Tooltip";

import { classNames, sizeToDimensionsClassName } from "lib/tailwind";

type PublicKeyLinkProps = {
  publicKey: PublicKey;
  className?: string;
  showExplorer?: boolean;
  showSolscan?: boolean;
};

export function PublicKeyLink({
  className,
  publicKey,
  showExplorer = false,
  showSolscan = false,
}: PublicKeyLinkProps) {
  const publicKeyLinkClassName = classNames("flex space-x-2", className);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(publicKey.toString());
    renderNotification({
      title: "Copied public key to clipboard",
      description: shortenAddress(publicKey.toString()),
    });
  };

  return (
    <div className={publicKeyLinkClassName}>
      {showSolscan && (
        <Tooltip text="Open in SolScan">
          <button onClick={() => viewAccountOnSolScan(publicKey.toString())}>
            <img
              src="/solscan.png"
              className={sizeToDimensionsClassName["xs"]}
            />
          </button>
        </Tooltip>
      )}

      {showExplorer && (
        <Tooltip text="Open in Explorer">
          <button onClick={() => viewAccountOnExplorer(publicKey.toString())}>
            <img
              src="/solana.png"
              className={sizeToDimensionsClassName["xs"]}
            />
          </button>
        </Tooltip>
      )}

      <Tooltip text="Copy to Clipboard">
        <button onClick={handleCopyToClipboard}>
          {shortenAddress(publicKey.toString())}
        </button>
      </Tooltip>
    </div>
  );
}
