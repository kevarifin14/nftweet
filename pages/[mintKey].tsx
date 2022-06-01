import { apolloClient } from "contexts/apollo";
import {
  NftweetDocument,
  NftweetQuery,
  NftweetQueryVariables,
  Nftweets,
} from "generated";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { getLayout } from "components/Layout";
import { NftweetPage } from "components/NftweetPage";

type NftweetProps = {
  nftweet: Nftweets;
};

export default function Nftweet({ nftweet }: NftweetProps) {
  return (
    <>
      <Head>
        <meta property="og:image" content={nftweet.image!} />
      </Head>

      <NftweetPage nftweet={nftweet} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await apolloClient.query<
    NftweetQuery,
    NftweetQueryVariables
  >({
    query: NftweetDocument,
    variables: { mintKey: context.query.mintKey as string },
  });

  return {
    props: { nftweet: data?.nftweet },
  };
};

Nftweet.getLayout = getLayout;
