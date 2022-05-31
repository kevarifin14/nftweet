import { parse, format, parseISO } from "date-fns";
import { useTweet } from "hooks/useTweet";
import ReactMarkdown from "react-markdown";

import { MediaObject } from "components/MediaObject";

import { classNames } from "lib/tailwind";

type TweetProps = {
  tweetId: string;
  className?: string;
};

export function Tweet({ tweetId, className }: TweetProps) {
  const { data } = useTweet(tweetId);

  const tweetClassName = classNames(
    "rounded-lg bg-black p-4 space-y-4 border-dark-light border",
    className
  );

  if (!data?.data) return null;

  return (
    <div className={tweetClassName}>
      <MediaObject
        size="lg"
        src={data?.includes?.users[0].profile_image_url}
        title={data?.includes?.users[0].name!}
        description={`@${data?.includes?.users[0].username}`}
      />

      <ReactMarkdown>{data?.data?.text}</ReactMarkdown>

      <p className="text-dark-accent text-sm">
        {format(parseISO(data?.data?.created_at!), "hh:mm a · MMMM dd, yyyy")}
      </p>
    </div>
  );
}
