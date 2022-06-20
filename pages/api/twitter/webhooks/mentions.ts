import crypto from "crypto";
import { TwitterApiRequest, twitterMiddleware } from "middleware/twitter";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { TwitterApi } from "twitter-api-v2";

const handler = nextConnect<TwitterApiRequest, NextApiResponse>();

handler.use(twitterMiddleware);

handler.get(async (req, res, next) => {
  const hmac = crypto
    .createHmac("sha256", process.env.TWITTER_API_KEY_SECRET!)
    .update(req.query.crc_token as string)
    .digest("base64");

  res.status(200).json({
    response_token: `sha256=${hmac}`,
  });

  return next();
});

handler.post(async (req, res, next) => {
  try {
    // @ mentions
    const tweetCreateEvents = req.body.tweet_create_events;

    let tweet;
    if (tweetCreateEvents && tweetCreateEvents.length > 0) {
      const [tweetCreateEvent] = tweetCreateEvents;

      const twitterApiV1 = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY!,
        appSecret: process.env.TWITTER_API_KEY_SECRET!,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      });
      const rwClient = twitterApiV1.readWrite;

      console.log(tweetCreateEvent);

      // original tweet (not a reply)
      if (!tweetCreateEvent.in_reply_to_status_id) {
        tweet = await rwClient.v1.tweet(
          `Mint your NFTweet👇\n\nhttps://makenftweet.com/?tweetId=${tweetCreateEvent.id_str}`,
          {
            in_reply_to_status_id: tweetCreateEvent.id_str,
            auto_populate_reply_metadata: true,
          }
        );
      }

      // reply
      if (
        tweetCreateEvent.in_reply_to_status_id &&
        tweetCreateEvent.text
          .slice(
            tweetCreateEvent.display_text_range.length > 0
              ? tweetCreateEvent.display_text_range[0]
              : 0,
            tweetCreateEvent.display_text_range.length > 1
              ? tweetCreateEvent.display_text_range[1]
              : tweetCreateEvent.display_text_range.length
          )
          .toLowerCase()
          .includes("@makenftweet")
      ) {
        tweet = await rwClient.v1.tweet(
          `Mint your NFTweet👇\n\nhttps://makenftweet.com/?tweetId=${tweetCreateEvent.in_reply_to_status_id_str}`,
          {
            in_reply_to_status_id: tweetCreateEvent.in_reply_to_status_id_str,
            auto_populate_reply_metadata: true,
          }
        );
      }
    }

    res.status(200).json({ tweet });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
  return next();
});

export default handler;
