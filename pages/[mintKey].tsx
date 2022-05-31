import { apolloClient } from "contexts/apollo";
import {
  NftweetDocument,
  NftweetQuery,
  NftweetQueryVariables,
} from "generated";
import { GetServerSideProps } from "next";

import { getLayout } from "components/Layout";
import { NftweetPage } from "components/NftweetPage";

export default function Nftweet({ nftweet }) {
  return <NftweetPage nftweet={nftweet} />;
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
