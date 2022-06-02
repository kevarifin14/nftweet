import { useMetadataContext } from "contexts/metadata";
import { DefaultSeo, DefaultSeoProps } from "next-seo";

export function Seo() {
  const { name, description, url, handle } = useMetadataContext();

  const openGraph = {
    title: name,
    description,
    url,
    type: "website",
    images: [
      {
        url: `https://efwqsaaqb5yxz4mslol6qcm4z6s4g3blzfw3e4ccdm5b2jr4.arweave.net/IW0JABAPcXzxkluX6_Amcz6XDbCvJbbJwQh_s6HS_Y8`,
      },
    ],
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
