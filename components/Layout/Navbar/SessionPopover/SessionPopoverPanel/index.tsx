import { Popover } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCurrentUser } from "contexts/currentUser";
import { shortenAddress } from "lib";
import { useEffect } from "react";
import { HiLink } from "react-icons/hi";

import { ConnectWalletButton } from "components/ConnectWalletButton";
import { ConnectedWalletMediaObject } from "components/ConnectedWalletMediaObject";
// import { classNames, Modal, Notification, ScaleUpTransition } from "@underdog-protocol/shared";
import { INavItem } from "components/Layout";
import { renderNotification } from "components/Notification";
import { UserMediaObject } from "components/UserMediaObject";

import { classNames } from "lib/tailwind";

import { VerticalNav } from "../../VerticalNav";

type SessionPopoverPanelProps = {
  navItems: INavItem[];
  className?: string;
};

export function SessionPopoverPanel({
  className,
  navItems,
}: SessionPopoverPanelProps) {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { currentUser } = useCurrentUser();

  const sessionPopoverPanelClassName = classNames(
    "bg-light-dark dark:bg-dark-light prose dark:prose-invert divide-y-2 dark:divide-dark-accent rounded-md focus:outline-none",
    "border-2 dark:border-dark-accent border-light-accent",
    className
  );

  useEffect(() => {
    if (publicKey) {
      renderNotification({
        title: "Wallet Connected",
        description: `Wallet with public key ${shortenAddress(
          publicKey.toString()
        )} connected`,
      });
    }
  }, [publicKey]);

  const walletNavItems: INavItem[] = [
    !connected
      ? {
          name: "Connect a Wallet",
          onClick: () => setVisible(true),
          icon: HiLink,
        }
      : false,
    connected
      ? {
          name: "Disconnect",
          onClick: async () => {
            await disconnect();
          },
          icon: HiLink,
        }
      : false,
  ].filter(Boolean) as INavItem[];

  return (
    <>
      {/* <ScaleUpTransition> */}
      <Popover.Panel className={sessionPopoverPanelClassName}>
        {({ close }) => (
          <>
            {currentUser && (
              <div className="py-4">
                <UserMediaObject user={currentUser} vertical size="lg" />
              </div>
            )}
            {currentUser?.wallets.length === 0 && (
              <div className="p-2">
                <ConnectWalletButton type="secondary" />
              </div>
            )}

            {currentUser?.wallets &&
              currentUser?.wallets.length > 0 &&
              publicKey && (
                <div className="p-3">
                  <ConnectedWalletMediaObject />
                </div>
              )}
            <VerticalNav
              navGroups={[[...walletNavItems, ...navItems]]}
              className="p-2"
              size="sm"
            />
          </>
        )}
      </Popover.Panel>
      {/* </ScaleUpTransition> */}
    </>
  );
}
