import useSWR from "swr";
import { findTweetById, TwitterResponse } from "twitter-api-sdk/dist/types";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useTweet = (tweetId: string) => {
  const { data } = useSWR<TwitterResponse<findTweetById>>(
    `/api/twitter/tweets/${tweetId}`,
    fetcher
  );
  return { data };
};
