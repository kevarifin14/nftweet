import { PublicKey } from "@solana/web3.js";
import { getAtaForMint } from "lib";
import { useEffect, useState } from "react";

export const useAtaForMint = (mint: PublicKey, buyer: PublicKey) => {
  const [ata, setAta] = useState<PublicKey>();
  // console.log(buyer!.toString())

  useEffect(() => {
    if (mint && buyer) {
      getAtaForMint(mint, buyer).then(([ataForMint]) => setAta(ataForMint));
    }
  }, [mint, buyer]);

  return ata;
};
