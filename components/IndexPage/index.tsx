import { MetaplexFile } from "@metaplex-foundation/js-next";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCurrentUser } from "contexts/currentUser";
import { useAddNftweetMutation, useNftweetsByTweetIdQuery } from "generated";
import { useMetaplex } from "hooks/useMetaplex";
import { useToggle } from "hooks/useToggle";
import { useTweet } from "hooks/useTweet";
import { useTweetImageBufferString } from "hooks/useTweetImageBuffer";
import { shortenAddress } from "lib";
import { generateTweetMetadata, viewTransactionOnSolScan } from "lib";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { FiCircle } from "react-icons/fi";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

import { Button } from "components/Button";
import { Container } from "components/Container";
import { Header } from "components/Header";
import { LoadingPage } from "components/Layout/LoadingPage";
import { NfTweetMetadata } from "components/NfTweetMetadata";
import { renderNotification } from "components/Notification";
import { Spin } from "components/Spin";

import { classNames, sizeToDimensionsClassName } from "lib/tailwind";

export function IndexPage() {
  const { publicKey, wallet, disconnect } = useWallet();
  const router = useRouter();
  const tweetId = router.query.tweetId;
  const metaplex = useMetaplex();
  const { data } = useTweet(tweetId! as string);
  const { setVisible } = useWalletModal();
  const metadata = useMemo(() => generateTweetMetadata(data!), [data]);
  const [metadataUri, setMetadataUri] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { data: tweetImageBufferStringData, blob } =
    useTweetImageBufferString(tweetId);
  const [addNftweet, { data: newNftweetData }] = useAddNftweetMutation();
  const { data: nftweetsData } = useNftweetsByTweetIdQuery({
    variables: { tweetId: tweetId! as string },
  });
  const { currentUser, showSignInModal, showConnectWalletModal } =
    useCurrentUser();

  const [processing, toggleProcessing] = useToggle();
  const [minting, toggleMinting] = useToggle();
  const [uploading, toggleUploading] = useToggle();

  if (!tweetId) {
    return <div></div>;
  }

  if (!data) {
    return <LoadingPage />;
  }

  const handleRestartMint = () => {
    setMetadataUri("");
    setTransactionId("");
    toggleProcessing();
  };

  const handleProcessMint = async () => {
    if (!currentUser) {
      showSignInModal();
      return;
    }

    if (currentUser.wallets.length === 0) {
      showConnectWalletModal();
      return;
    }

    if (currentUser.wallets.length > 0 && !wallet) {
      setVisible(true);
      return;
    }

    if (
      !currentUser.wallets
        .map(({ key }) => key)
        .includes(publicKey?.toString()!)
    ) {
      renderNotification({
        title: "Only approved wallets can mint NFTweets",
        description: `Connect wallet with public key ${shortenAddress(
          currentUser.wallets[0].key
        )}`,
      });
      disconnect();
      return;
    }

    if (currentUser?.twitterUserId === data?.data?.author_id) {
      toggleProcessing();
      await handleMint();
    } else {
      renderNotification({
        title: "You can only mint NFTweets of your own tweets",
      });
    }
  };

  const handleMint = async () => {
    let uri = metadataUri;
    if (!metadataUri) {
      toggleUploading();
      try {
        const metaplexFile = await MetaplexFile.fromFile(
          new File([blob], "0.png", { type: "image/png" })
        );
        const uploadMetadataResult = await metaplex.nfts().uploadMetadata({
          ...metadata,
          image: metaplexFile,
          properties: {
            creators: [
              {
                address: "6DdDq9StXvPSrcUw9dPM9CpWPVgQC39MQxtnPVZKaEvp",
                share: 2,
              },
              { address: publicKey!.toString(), share: 98 },
            ],
          },
        });
        uri = uploadMetadataResult.uri;
        setMetadataUri(uri);
        toggleUploading();
      } catch (e) {
        toggleUploading();
        renderNotification({
          title: "There was a problem uploading your NFTweet Metadata",
        });
        return;
      }
    }

    if (!transactionId) {
      toggleMinting();
      try {
        const { transactionId, mint } = await metaplex.nfts().create({ uri });
        setTransactionId(transactionId);
        await addNftweet({
          variables: {
            userId: currentUser?.id,
            mintKey: mint.publicKey.toString(),
            tweetId: data?.data?.id!,
          },
        });
        toggleMinting();
      } catch (e) {
        toggleMinting();
        renderNotification({
          title: "There was a problem minting your NFTweet",
        });
        return;
      }
    }
  };

  if (nftweetsData?.nftweets?.length || (0 > 0 && !processing)) {
    renderNotification({
      title: "Tweet has already been minted",
      description: "Taking you to the NFTweet",
    });
    router.push(`/${nftweetsData?.nftweets[0].mintKey}`);
    return <LoadingPage />;
  }

  return (
    <Container size="5xl" className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {processing ? (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div>
                {uploading && <Spin size="sm" />}
                {!uploading && !metadataUri && (
                  <HiXCircle
                    className={classNames(
                      sizeToDimensionsClassName["sm"],
                      "text-red-500"
                    )}
                  />
                )}
                {metadataUri && (
                  <HiCheckCircle
                    className={classNames(
                      sizeToDimensionsClassName["sm"],
                      "text-green-500"
                    )}
                  />
                )}
              </div>

              <Header
                vertical
                title="Uploading NFTweet metadata to Arweave"
                description="You'll need to approve the transaction and sign a few messages"
                cta={(() => {
                  if (metadataUri) {
                    return "View on Arweave";
                  } else if (!uploading && !metadataUri) {
                    return "Try Again";
                  } else {
                    return " ";
                  }
                })()}
                ctaOnClick={() => {
                  if (metadataUri) {
                    window.open(metadataUri);
                  } else if (!uploading && !metadataUri) {
                    handleMint();
                  }
                }}
                size="md"
              />
            </div>

            <div className="flex space-x-4">
              <div>
                {!minting && metadataUri && !transactionId && (
                  <HiXCircle
                    className={classNames(
                      sizeToDimensionsClassName["sm"],
                      "text-red-500"
                    )}
                  />
                )}
                {!minting && !transactionId && !metadataUri && (
                  <FiCircle
                    className={classNames(
                      sizeToDimensionsClassName["sm"],
                      "text-dark-accent"
                    )}
                  />
                )}
                {minting && metadataUri && !transactionId && <Spin size="sm" />}
                {transactionId && (
                  <HiCheckCircle
                    className={classNames(
                      sizeToDimensionsClassName["sm"],
                      "text-green-500"
                    )}
                  />
                )}
              </div>

              <Header
                title="Mint your NFTweet"
                description="You'll need a little Solana to cover network fees and approve the mint transaction"
                vertical
                cta={(() => {
                  if (transactionId) {
                    return "View on SolScan";
                  } else if (
                    !minting &&
                    !transactionId &&
                    !uploading &&
                    metadataUri
                  ) {
                    return "Try Again";
                  } else {
                    return " ";
                  }
                })()}
                ctaOnClick={() => {
                  if (transactionId) {
                    return viewTransactionOnSolScan(transactionId);
                  } else if (!minting && !transactionId && !uploading) {
                    return handleMint();
                  } else {
                    return " ";
                  }
                }}
                size="md"
              />
            </div>

            {!uploading && !minting && !newNftweetData?.nftweet && (
              <Button type="secondary" onClick={handleRestartMint} block>
                Start Over
              </Button>
            )}

            {newNftweetData?.nftweet && (
              <Button
                type="primary"
                block
                onClick={() =>
                  router.push(`/${newNftweetData?.nftweet?.mintKey}`)
                }
              >
                View NFTweet
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <NfTweetMetadata tweetId={tweetId! as string} />
          </div>
        )}

        <div className="row-start-1 lg:col-start-2">
          {tweetImageBufferStringData ? (
            <button
              onClick={() =>
                window.open(`https://twitter.com/twitter/status/${tweetId}`)
              }
            >
              <img src={tweetImageBufferStringData} />
            </button>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Spin size="md" />
            </div>
          )}
        </div>
      </div>

      {/* <ConnectWalletButton /> */}

      {!processing && tweetImageBufferStringData && (
        <div className="flex justify-center">
          <Button size="xl" type="primary" onClick={handleProcessMint}>
            Mint NFTweet
          </Button>
        </div>
      )}
    </Container>
  );
}
