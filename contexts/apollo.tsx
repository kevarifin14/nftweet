import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { ReactNode } from "react";

export const createApolloClient = (headers = {}) => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
    headers,
  });

  const link = ApolloLink.from([httpLink]);

  const cache = new InMemoryCache();
  return new ApolloClient({ link, cache });
};

export const apolloClient = createApolloClient({
  "x-hasura-role": "public",
});
export const createAdminApolloClient = () =>
  createApolloClient({
    "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
  });

type ApolloClientProviderProps = {
  children: ReactNode;
};

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
