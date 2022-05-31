import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { post } from "lib/http";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res, next) => {
  try {
    const headers = {};
    if (req.headers["x-hasura-role"]) {
      headers["x-hasura-role"] = req.headers["x-hasura-role"];
    }

    if (req.headers["x-hasura-admin-secret"]) {
      headers["x-hasura-admin-secret"] = req.headers["x-hasura-admin-secret"];
    }

    const response = await post(
      process.env.HASURA_ENDPOINT!,
      req.body,
      headers
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
  return next;
});

export default handler;
