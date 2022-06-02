import { JsonMetadata, Nft } from "@metaplex-foundation/js-next";
import { format, fromUnixTime } from "date-fns";
import { Nftweets } from "generated";
import { useEffect, useState } from "react";

import { Card } from "components/Card";
import { Header } from "components/Header";

import { classNames } from "lib/tailwind";

type NftweetCardProps = {
  nftweet: Nftweets;
};

export function NftweetCard({ nftweet }: NftweetCardProps) {
  return (
    <Card noPadding className={classNames(!nftweet ? "animate-pulse" : "")}>
      <div
        className="rounded-t-md h-64 border border-light-accent dark:border-dark-accent bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${nftweet.image})` }}
      />
      <div className="px-4 py-6">
        <Header
          loading={!nftweet}
          title={`NFTweet #${nftweet.tweetId}`}
          description={`Minted ${format(
            new Date(nftweet.createdAt),
            "MMMM dd, yyyy hh:mm a"
          )}`}
          size="xs"
        />
      </div>
    </Card>
  );
}
