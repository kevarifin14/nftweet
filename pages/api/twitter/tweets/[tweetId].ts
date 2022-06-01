import { TwitterApiRequest, twitterMiddleware } from "middleware/twitter";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<TwitterApiRequest, NextApiResponse>();

handler.use(twitterMiddleware);

handler.get(async (req, res, next) => {
  try {
    const value = await req.twitterClient.tweets.findTweetById(
      req.query.tweetId as string,
      {
        expansions: ["author_id"],
        "user.fields": [
          "id",
          "name",
          "username",
          "verified",
          "profile_image_url",
        ],
        "tweet.fields": ["created_at", "text"],
      }
    );
    res.status(200).json(value);
  } catch (e) {
    res.status(400).json(e);
  }
  return next;
});

export default handler;
