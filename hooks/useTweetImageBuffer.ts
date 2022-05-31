import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useTweetImageBufferString = (tweetId) => {
  const { data } = useSWR(`/api/test?tweetId=${tweetId}`, fetcher);

  return { data };
};
