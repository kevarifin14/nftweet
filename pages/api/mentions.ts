import { createAdminApolloClient } from "contexts/apollo";
import { addMinutes, format, sub } from "date-fns";
import {
  AddMentionsDocument,
  AddMentionsMutation,
  AddMentionsMutationVariables,
} from "generated";
import { TwitterApiRequest, twitterMiddleware } from "middleware/twitter";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";

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
    const date = new Date();
    const startTime = format(
      sub(addMinutes(date, date.getTimezoneOffset()), { minutes: 30 }),
      "yyyy-MM-dd'T'HH:mm:ss'Z'"
    );

    const value = await req.twitterClient.tweets.usersIdMentions(
      "1529641301724909568",
      {
        start_time: startTime,
        "tweet.fields": ["referenced_tweets", "in_reply_to_user_id"],
      }
    );

    // try {
    //   if (value.data) {
    //     await adminApollo.mutate<
    //       AddMentionsMutation,
    //       AddMentionsMutationVariables
    //     >({
    //       mutation: AddMentionsDocument,
    //       variables: {
    //         objects: value.data?.map((tweet) => ({ tweetId: tweet.id })),
    //       },
    //     });

    //     await Promise.all(
    //       value.data.map((mention) => {
    //         const tweetToReplyTo =
    //           mention.referenced_tweets?.find(
    //             ({ type }) => type === "replied_to"
    //           ) ||
    //           mention.referenced_tweets?.find(
    //             ({ type }) => type === "quoted"
    //           ) ||
    //           mention;
    //         return req.twitterClient.tweets.createTweet({
    //           text: `Mint your NFTweet👇\n\nhttps://makenftweet.com/?tweetId=${tweetToReplyTo.id}`,
    //           reply: { in_reply_to_tweet_id: tweetToReplyTo.id },
    //         });
    //       })
    //     );
    //   }
    //   res.status(200).json(value);
    // } catch (e) {
    //   console.log(e);
    // }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }

  return next();
});

export default handler;
