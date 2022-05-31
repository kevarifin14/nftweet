import { useEffect, useState } from "react";

export const useTweetImageBufferString = (tweetId) => {
  const [data, setData] = useState<Blob>();
  useEffect(() => {
    if (tweetId) {
      fetch(`https://nftweet-api.vercel.app/api/image?tweetId=${tweetId}`)
        .then((res) => res.blob())
        .then((blob) => setData(blob));
    }
  }, [tweetId]);
  return { data };
};
