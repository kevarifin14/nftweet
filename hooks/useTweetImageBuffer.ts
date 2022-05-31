import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.blob());

export const useTweetImageBufferString = (tweetId) => {
  const { data: blobData } = useSWR(`/api/test?tweetId=${tweetId}`, fetcher);
  if (blobData) {
    const data = URL.createObjectURL(blobData!);

    return { data, blob: blobData };
  } else {
    return {};
  }
};
