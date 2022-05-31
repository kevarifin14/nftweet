import { Users, useUsersByNameQuery, useUsersQuery } from "generated";
import { useToggle } from "hooks/useToggle";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { createContext, ReactNode, useCallback, useContext } from "react";

import { Button } from "components/Button";
import { ConnectWalletButton } from "components/ConnectWalletButton";
import { Header } from "components/Header";
import { Modal } from "components/Modal";

export type CurrentUserContextProps = {
  currentUser?: Users;
  loading: boolean;
  showSignInModal: () => void;
  showConnectWalletModal: () => void;
  refreshCurrentUser: () => void;
};

export const CurrentUserContext = createContext<CurrentUserContextProps>({
  currentUser: undefined,
  showSignInModal: () => {},
  showConnectWalletModal: () => {},
  refreshCurrentUser: () => {},
  loading: false,
});

export const useCurrentUser = () => useContext(CurrentUserContext);

type CurrentUserProviderProps = {
  children: ReactNode;
};

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const { data, status } = useSession();
  const [signInModalOpen, toggleSignInModalOpen] = useToggle();
  const [connectWalletModalOpen, toggleConnectWalletModalOpen] = useToggle();
  const {
    data: usersData,
    loading: loadingUser,
    refetch,
  } = useUsersByNameQuery({ variables: { name: data?.user?.name! } });
  const loading = status === "loading" || loadingUser;
  const currentUser = usersData?.users[0];

  const showSignInModal = () => {
    if (!signInModalOpen && !currentUser) {
      toggleSignInModalOpen();
    }
  };

  const showConnectWalletModal = () => {
    if (!connectWalletModalOpen) {
      toggleConnectWalletModalOpen();
    }
  };

  const refreshCurrentUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        loading,
        showSignInModal,
        refreshCurrentUser,
        showConnectWalletModal,
      }}
    >
      {children}
      <Modal
        open={signInModalOpen}
        className="space-y-4"
        onClose={toggleSignInModalOpen}
      >
        <Header
          centered
          title="You must be signed in to mint an NFTweet"
          size="sm"
        />
        <Button type="primary" block onClick={() => signIn("twitter")}>
          Sign In
        </Button>
      </Modal>

      <Modal
        open={connectWalletModalOpen && currentUser?.wallets.length === 0}
        className="space-y-4"
        onClose={toggleConnectWalletModalOpen}
      >
        <Header
          centered
          title="Connect a wallet to mint an NFTweet"
          size="sm"
        />
        <ConnectWalletButton />
      </Modal>
    </CurrentUserContext.Provider>
  );
}
