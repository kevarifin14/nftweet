import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
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

export const viewTransactionOnSolScan = (transactionId: string) => {
  window.open(
    `https://solscan.io/tx/${transactionId}?cluster=${
      process.env.NODE_ENV === "development"
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Mainnet
    }`
  );
};
