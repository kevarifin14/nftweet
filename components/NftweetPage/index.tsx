import { Nft } from "@metaplex-foundation/js-next";
import { PublicKey } from "@solana/web3.js";
import { Nftweets } from "generated";
import { useAtaForMint } from "hooks/useAtaForMint";
import { useMetaplex } from "hooks/useMetaplex";
import { basisPointsToPercent } from "lib";
import _ from "lodash";
import { useEffect, useState } from "react";

import { Button } from "components/Button";
import { Card } from "components/Card";
import { Container } from "components/Container";
import { Disclosure } from "components/Disclosure";
import { Header } from "components/Header";
import { LoadingPage } from "components/Layout/LoadingPage";
import { renderNotification } from "components/Notification";

import { trackMakeAnOfferInterest } from "lib/analytics";

import { PublicKeyLink } from "./PublicKeyLink";

type NftweetPageProps = {
  nftweet: Nftweets;
};

export function NftweetPage({ nftweet }: NftweetPageProps) {
  const metaplex = useMetaplex();
  const [nft, setNft] = useState<Nft>();
  const ata = useAtaForMint(nft?.mint!, nft?.updateAuthority!);

  useEffect(() => {
    if (nftweet.mintKey) {
      metaplex.nfts().findByMint(new PublicKey(nftweet.mintKey)).then(setNft);
    }
  }, [setNft, metaplex, nftweet]);

  if (!nft) {
    return <LoadingPage />;
  }

  const handleMakeAnOffer = () => {
    trackMakeAnOfferInterest();
    renderNotification({ title: "Coming Soon!" });
  };

  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <img src={nft?.metadata.image} />
        </div>

        <div className="py-8 space-y-8">
          <Header
            title={nft?.name}
            vertical
            cta="View on Twitter"
            ctaOnClick={() => window.open(nft.metadata.external_url)}
            size="xl"
          />

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

          <Disclosure title="Details">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-bold">Mint Address</p>
                <PublicKeyLink publicKey={nft.mint} showExplorer showSolscan />
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold">Token Address</p>
                <PublicKeyLink publicKey={ata!} showExplorer showSolscan />
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold">Tweeter Royalties</p>
                <p>{basisPointsToPercent(nft.sellerFeeBasisPoints)}</p>
              </div>
            </div>
          </Disclosure>
        </div>
      </div>
    </Container>
  );
}
