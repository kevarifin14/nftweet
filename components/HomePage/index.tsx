import { useNftweetsQuery } from "generated";
import _ from "lodash";
import Link from "next/link";

import { Container } from "components/Container";
import { Header } from "components/Header";
import { LoadingPage } from "components/Layout/LoadingPage";

import { NftweetCard } from "./NftweetCard";
import { TwitterLinkForm } from "./TwitterLinkForm";

type HomePageProps = {};

export function HomePage({}: HomePageProps) {
  const { data, loading } = useNftweetsQuery();

  if (loading) return <LoadingPage />;

  return (
    <Container size="5xl" className="space-y-8 py-4">
      <TwitterLinkForm />

      <Header title="Latest NFTweets" className="pb-8" />
      <div className="grid md:grid-cols-3 gap-6">
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
