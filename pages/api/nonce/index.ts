import bs58 from "bs58";
import { adminApolloClient } from "contexts/apollo";
import { serialize } from "cookie";
import crypto from "crypto";
import {
  AddWalletDocument,
  AddWalletMutation,
  AddWalletMutationVariables,
} from "generated";
import { SessionApiRequest, sessionMiddleware } from "middleware/session";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import nacl from "tweetnacl";

const handler = nextConnect();

handler.use(sessionMiddleware);

export interface AuthenticatedApiRequest extends SessionApiRequest {
  cookies: Record<string, string>;
}

handler.get(
  async (req: AuthenticatedApiRequest, res: NextApiResponse, next) => {
    const nonce = crypto.randomBytes(32).toString("base64");
    res.setHeader(
      "Set-Cookie",
      serialize("auth-nonce", nonce, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
    );

    res.status(200).json({ nonce });

    return next();
  }
);

handler.post(
  async (req: AuthenticatedApiRequest, res: NextApiResponse, next) => {
    const nonce = req.cookies["auth-nonce"];

    const message = `Sign this message to connect your wallet.\n\nNonce: ${nonce}`;
    const messageBytes = new TextEncoder().encode(message);

    const publicKeyBytes = bs58.decode(req.body.publicKey);
    const signatureBytes = bs58.decode(req.body.signature);

    const result = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    if (!result) {
      throw new Error("user can not be authenticated");
    }

    try {
      const { data } = await adminApolloClient.mutate<
        AddWalletMutation,
        AddWalletMutationVariables
      >({
        mutation: AddWalletDocument,
        variables: { key: req.body.publicKey, userId: req.user.id },
      });
      res.status(200).json({ wallet: data?.wallet });
    } catch (e) {
      res.status(400).json(e);
    }

    return next();
  }
);

export default handler;
