import { useConnection } from "@solana/wallet-adapter-react";
import { ParsedAccountData, PublicKey } from "@solana/web3.js";
import { useWalletQuery } from "generated";
import { useEffect, useState } from "react";

export const useNftOwner = (mint: PublicKey) => {
  const { connection } = useConnection();
  const [owner, setOwner] = useState<PublicKey>();
  const { data } = useWalletQuery({ variables: { key: owner?.toString()! } });

  useEffect(() => {
    if (connection && mint) {
      connection
        .getTokenLargestAccounts(mint)
        .then((largestAccounts) =>
          connection.getParsedAccountInfo(largestAccounts.value[0].address)
        )
        .then((parsedAccount) => {
          setOwner(
            (parsedAccount.value?.data as ParsedAccountData).parsed.info.owner
          );
        });
    }
  }, [mint, connection]);

  return { publicKey: owner, wallet: data?.wallet };
};
