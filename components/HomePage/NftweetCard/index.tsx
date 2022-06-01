import { JsonMetadata, Nft } from "@metaplex-foundation/js-next";
import { format, fromUnixTime } from "date-fns";
import { Nftweets } from "generated";
import { useEffect, useState } from "react";

import { Card } from "components/Card";
import { Header } from "components/Header";

import { classNames } from "lib/tailwind";

// import { useMetaplexTokenMetadata } from "@strata-foundation/react";

type NftweetCardProps = {
  nftweet: Nftweets;
  nft: Nft;
};

export function NftweetCard({ nftweet, nft }: NftweetCardProps) {
  const [metadata, setMetadata] = useState<JsonMetadata<string>>();

  useEffect(() => {
    if (nft) {
      nft.metadataTask.run().then(setMetadata);
    }
  }, [nft]);

  return (
    <Card
      noPadding
      className={classNames(!(nft && metadata) ? "animate-pulse" : "")}
    >
      <div
        className="rounded-t-md h-64 border border-light-accent dark:border-dark-accent bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${metadata?.image})` }}
      />
      <div className="px-4 py-6">
        <Header
          loading={!(metadata && nft)}
          title={nft?.name}
          description={
            metadata &&
            nft &&
            `Tweeted ${format(
              fromUnixTime(
                metadata?.attributes?.find(
                  (attribute) => attribute.trait_type === "Timestamp"
                )?.value as number
              ),
              "MMMM dd, yyyy mm:hh a"
            )}\n\nMinted ${format(
              new Date(nftweet.createdAt),
              "MMMM dd, yyyy mm:hh a"
            )}`
          }
          size="xs"
        />
      </div>
    </Card>
  );
}
