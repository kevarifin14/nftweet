import { useRouter } from "next/router";

import { HomePage } from "components/HomePage";
import { IndexPage } from "components/IndexPage";
import { getLayout } from "components/Layout";

type IndexProps = {
  tweetId?: string;
};

export default function Index({ tweetId }: IndexProps) {
  const router = useRouter();

  if (router.query.tweetId) {
    return <IndexPage />;
  } else {
    return <HomePage />;
  }
}

Index.getLayout = getLayout;
