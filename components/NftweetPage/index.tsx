import { Nft } from "@metaplex-foundation/js-next";
import { PublicKey } from "@solana/web3.js";
import { Nftweets } from "generated";
import { useMetaplex } from "hooks/useMetaplex";
import _ from "lodash";
import { useEffect, useState } from "react";

import { Button } from "components/Button";
import { Card } from "components/Card";
import { Container } from "components/Container";
import { Header } from "components/Header";
import { LoadingPage } from "components/Layout/LoadingPage";
import { renderNotification } from "components/Notification";

type NftweetPageProps = {
  nftweet: Nftweets;
};

export function NftweetPage({ nftweet }: NftweetPageProps) {
  const metaplex = useMetaplex();
  const [nft, setNft] = useState<Nft>();

  useEffect(() => {
    metaplex.nfts().findByMint(new PublicKey(nftweet.mintKey)).then(setNft);
  }, [metaplex, setNft, nftweet]);

  if (!nft) {
    return <LoadingPage />;
  }

  const handleMakeAnOffer = () => {
    renderNotification({ title: "NFTweet marketplace coming soon!" });
  };

  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <img src={nft?.metadata.image} />
        </div>

        <div className="py-8 space-y-8">
          <Header title={nft?.name} size="xl" />

          <Card size="7xl" className="flex items-center justify-center">
            <Button type="primary" onClick={handleMakeAnOffer}>
              Make an Offer
            </Button>
          </Card>

          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {nft.metadata?.attributes?.map((attribute) => (
              <Card key={attribute.trait_type} size="xl">
                <Header
                  size="sm"
                  title={_.startCase(attribute.trait_type)}
                  description={attribute.value?.toString().slice(0, 32)}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
