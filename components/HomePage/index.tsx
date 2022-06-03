import { Nft } from "@metaplex-foundation/js-next";
import { PublicKey } from "@solana/web3.js";
import { useNftweetsQuery } from "generated";
import { useMetaplex } from "hooks/useMetaplex";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Container } from "components/Container";
import { Header } from "components/Header";
import { Input } from "components/Input";
import { LoadingPage } from "components/Layout/LoadingPage";

import { NftweetCard } from "./NftweetCard";
import { TwitterLinkForm } from "./TwitterLinkForm";

type HomePageProps = {};

export function HomePage({}: HomePageProps) {
  const { data, loading } = useNftweetsQuery();

  if (loading) return <LoadingPage />;

  return (
    <Container size="5xl" className="space-y-8">
      <TwitterLinkForm />

      <Header title="Latest NFTweets" className="pb-8" />
      <div className="grid grid-cols-3 gap-6">
        {data?.nftweets.map((nftweet) => (
          <Link href={`/${nftweet.mintKey}`} key={nftweet.tweetId}>
            <a>
              <NftweetCard nftweet={nftweet} />
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}
