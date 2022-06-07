import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { Client } from "twitter-api-sdk";

export const twitterClient = new Client(process.env.TWITTER_BEARER_TOKEN!);
// export const twitterClient = new Client(process.env.TWITTER_RW_ACCESS_TOKEN!);

export interface TwitterApiRequest extends NextApiRequest {
  twitterClient: Client;
}

export const twitterMiddleware = (
  req: TwitterApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  req.twitterClient = twitterClient;
  return next();
};
