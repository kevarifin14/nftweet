import { createAdminApolloClient } from "contexts/apollo";
import {
  Users,
  UsersByNameDocument,
  UsersByNameQuery,
  UsersByNameQueryVariables,
} from "generated";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { NextHandler } from "next-connect";

export interface SessionApiRequest extends NextApiRequest {
  session: Session;
  user: Users;
}

export const sessionMiddleware = async (
  req: SessionApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req });

  if (session?.user) {
    const adminApolloClient = createAdminApolloClient();
    const { data } = await adminApolloClient.query<
      UsersByNameQuery,
      UsersByNameQueryVariables
    >({
      query: UsersByNameDocument,
      variables: { name: session.user.name! },
    });
    req.session = session;
    req.user = data?.users[0];

    return next();
  } else {
    return res.status(403).json({ message: "Not Authorized" });
  }
};
