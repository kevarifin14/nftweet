import { useMetadataContext } from "contexts/metadata";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import { useRouter } from "next/router";

export function Seo() {
  const { name, description, url, handle } = useMetadataContext();
  const router = useRouter();

  const thumbnail = router.query.tweetId
    ? `https://nftweet-api.vercel.app/api/image?tweetId=${router.query.tweetId}`
    : `${url}/thumbnail.png`;

  const openGraph = {
    title: name,
    description,
    url,
    type: "website",
    images: [{ url: thumbnail }],
  };

  const twitter = {
    site: name,
    handle: handle,
    cardType: "summary_large_image",
  };

  const seoProps: DefaultSeoProps = {
    title: name,
    description,
    openGraph,
    twitter,
  };

  return <DefaultSeo {...seoProps} />;
}
