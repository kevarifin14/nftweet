import {
  UpsertUserDocument,
  UpsertUserMutation,
  UpsertUserMutationVariables,
} from "generated";
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

import { createAdminApolloClient } from "../../../contexts/apollo";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      // authorization: {
      //   url: "https://twitter.com/i/oauth2/authorize",
      //   params: {
      //     scope: "users.read tweet.read offline.access tweet.write",
      //   },
      // },
    }),
  ],
  events: {
    async signIn({ user, account, ...rest }) {
      if (account.provider === "twitter" && user) {
        try {
          const adminApolloClient = createAdminApolloClient();
          await adminApolloClient.mutate<
            UpsertUserMutation,
            UpsertUserMutationVariables
          >({
            mutation: UpsertUserDocument,
            variables: {
              email: user.email!,
              twitterUserId: user.id!,
              name: user.name!,
              image: user.image!,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
