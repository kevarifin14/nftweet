import { Nft } from "@metaplex-foundation/js-next";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

import { useMetaplex } from "./useMetaplex";
import { useToggle } from "./useToggle";

export const useNft = (mint: PublicKey) => {
  const [nft, setNft] = useState<Nft>();
  const [loading, toggleLoading] = useToggle();
  const metaplex = useMetaplex();

  useEffect(() => {
    if (metaplex && mint) {
      toggleLoading();
      metaplex
        .nfts()
        .findByMint(mint)
        .then((n) => {
          setNft(n);
          toggleLoading();
        });
    }
  }, [setNft, metaplex, mint, toggleLoading]);

  return { nft, loading };
};
