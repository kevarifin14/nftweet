import { Nft } from "@metaplex-foundation/js-next";
import { PublicKey } from "@solana/web3.js";
import { useMetaplexTokenMetadata } from "@strata-foundation/react";
import { useNftweetsQuery } from "generated";
import { useMetaplex } from "hooks/useMetaplex";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Container } from "components/Container";
import { Header } from "components/Header";
import { LoadingPage } from "components/Layout/LoadingPage";

import { classNames } from "lib/tailwind";

import { NftweetCard } from "./NftweetCard";

type HomePageProps = {};

export function HomePage({}: HomePageProps) {
  const { data, loading } = useNftweetsQuery();
  const metaplex = useMetaplex();
  const [nfts, setNfts] = useState<Nft[]>();
  const router = useRouter();

  useEffect(() => {
    if (data?.nftweets) {
      metaplex
        .nfts()
        .findAllByMintList(
          data?.nftweets.map((nftweet) => new PublicKey(nftweet.mintKey))
        )
        .then(setNfts);
    }
  }, [metaplex, data, setNfts]);

  if (!nfts || loading) return <LoadingPage />;

  return (
    <Container size="5xl">
      <Header title="Latest NFTweets" className="pb-8" />
      <div className="grid grid-cols-3 gap-6">
        {_.range(nfts?.length).map((i) => (
          <button
            key={data?.nftweets[i].mintKey}
            onClick={() => router.push(`/${data?.nftweets[i].mintKey}`)}
          >
            <NftweetCard nftweet={data?.nftweets[i]} nft={nfts[i]} />
          </button>
        ))}
      </div>
    </Container>
  );
}
