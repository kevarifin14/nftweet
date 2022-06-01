import { TwitterApiRequest, twitterMiddleware } from "middleware/twitter";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<TwitterApiRequest, NextApiResponse>();

handler.use(twitterMiddleware);

handler.get(async (req, res, next) => {
  try {
    const value = await req.twitterClient.users.findUserById(
      req.query.userId as string,
      {
        "user.fields": ["profile_image_url"],
      }
    );
    res.status(200).json(value);
  } catch (e) {
    res.status(400).json(e);
  }
  return next;
});

export default handler;
