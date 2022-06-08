import { createAdminApolloClient } from "contexts/apollo";
import {
  AddMentionsDocument,
  AddMentionsMutation,
  AddMentionsMutationVariables,
  LastMentionDocument,
  LastMentionQuery,
} from "generated";
import { TwitterApiRequest, twitterMiddleware } from "middleware/twitter";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { TwitterApi } from "twitter-api-v2";

const handler = nextConnect<TwitterApiRequest, NextApiResponse>();

handler.use(twitterMiddleware);

handler.post(async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization !== `Bearer ${process.env.NFTWEET_API_KEY}`) {
    res.status(401).json({ message: "Unauthorized" });
    return next();
  }

  try {
    const adminApollo = createAdminApolloClient();

    const { data } = await adminApollo.query<LastMentionQuery>({
      query: LastMentionDocument,
    });

    const recentTweets = await req.twitterClient.tweets.tweetsRecentSearch({
      query: "is:quote @MakeNFTweet",
      since_id: data?.mentions[0].tweetId,
      expansions: ["author_id"],
      "tweet.fields": ["referenced_tweets", "author_id"],
    });

    const twitterApiV1 = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_KEY_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    const rwClient = twitterApiV1.readWrite;

    try {
      if (recentTweets.data) {
        await adminApollo.mutate<
          AddMentionsMutation,
          AddMentionsMutationVariables
        >({
          mutation: AddMentionsDocument,
          variables: {
            objects: recentTweets.data?.map((tweet) => ({ tweetId: tweet.id })),
          },
        });

        await Promise.all(
          recentTweets.data.map((tweet) => {
            const tweetToReplyTo = tweet.referenced_tweets?.find(
              ({ type }) => type === "quoted"
            );

            return rwClient.v1.tweet(
              `Mint your NFTweet👇\n\nhttps://makenftweet.com/?tweetId=${tweetToReplyTo.id}`,
              {
                in_reply_to_status_id: tweetToReplyTo?.id,
                auto_populate_reply_metadata: true,
              }
            );
          })
        );
      }
      res.status(200).json(recentTweets);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }

  return next();
});

export default handler;
