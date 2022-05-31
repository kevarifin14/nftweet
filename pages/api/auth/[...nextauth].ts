import { adminApolloClient } from "contexts/apollo";
import {
  UpsertUserDocument,
  UpsertUserMutation,
  UpsertUserMutationVariables,
} from "generated";
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  events: {
    async signIn({ user, account }) {
      if (account.provider === "twitter" && user) {
        try {
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
});
