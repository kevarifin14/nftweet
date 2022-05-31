import { GetServerSideProps } from "next";
import Head from "next/head";

import { IndexPage } from "components/IndexPage";
import { getLayout } from "components/Layout";

type IndexProps = {
  tweetId?: string;
};

export default function Index({ tweetId }: IndexProps) {
  return (
    <>
      <Head>
        {tweetId && (
          <meta
            name="og:image"
            content={`https://nftweet-api.vercel.app/api/image?tweetId=${tweetId}`}
          />
        )}
      </Head>

      <IndexPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { tweetId: context.query.tweetId } };
};

Index.getLayout = getLayout;
