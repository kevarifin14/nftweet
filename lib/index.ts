import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PublicKey } from "@solana/web3.js";
import { createHash, verify } from "crypto";
import { getUnixTime, parseISO } from "date-fns";
import { findTweetById, TwitterResponse } from "twitter-api-sdk/dist/types";

export const shortenAddress = (address: string, chars = 4) => {
  return `${address?.slice(0, chars)}...${address?.slice(-chars)}`;
};

export const verifyTweetHash = (tweetHash: string) => {};

export const generateTweetString = (
  twitterUserId: string,
  text: string,
  timestamp: number
) => {
  return [twitterUserId, text, timestamp].join("\n");
};

export const generateTweetHash = (
  twitterUserId: string,
  text: string,
  timestamp: number
) => {
  const tweetString = generateTweetString(twitterUserId, text, timestamp);
  return createHash("sha256").update(tweetString).digest("hex");
};

export const generateTweetMetadata = (data: TwitterResponse<findTweetById>) => {
  const tweetId = data?.data?.id;
  const twitterUserId = data?.data?.author_id;
  const timestamp = getUnixTime(parseISO(data?.data?.created_at!));

  const metadata = {
    name: `NFTweet #${tweetId}`,
    symbol: `NFTWEET`,
    external_url: `https://twitter.com/twitter/status/${tweetId}`,
    description: data?.data?.text,
    seller_fee_basis_points: 420,
    attributes: [
      { trait_type: "Tweet ID", value: tweetId },
      { trait_type: "Twitter User ID", value: twitterUserId },
      { trait_type: "Timestamp", value: timestamp },
      {
        trait_type: "Hash",
        value: generateTweetHash(twitterUserId!, data?.data?.text!, timestamp),
      },
    ],
  };
  return metadata;
};

const cluster =
  process.env.NODE_ENV === "development"
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet;

export const viewTransactionOnSolScan = (transactionId: string) => {
  window.open(`https://solscan.io/tx/${transactionId}?cluster=${cluster}`);
};

export const viewAccountOnSolScan = (publicKey: string) => {
  window.open(`https://solscan.io/token/${publicKey}?cluster=${cluster}`);
};

export const viewAccountOnExplorer = (publicKey: string) => {
  window.open(
    `https://explorer.solana.com/address/${publicKey}?cluster=${cluster}`
  );
};

export const basisPointsToPercent = (bps: number, precision = 2) => {
  return `${(bps / 1e2).toFixed(precision)}%`;
};

export const getAtaForMint = async (
  mint: PublicKey,
  buyer: PublicKey
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [buyer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
};
