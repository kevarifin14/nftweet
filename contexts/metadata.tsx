import { createContext, ReactNode, useContext } from "react";

export type MetadataContextProps = {
  name: string;
  description: string;
  url: string;
  handle: string;
};

const defaultMetadataContext = {
  name: "Make NFTweet",
  description: "Turn your tweets into NFTs",
  url: process.env.NEXT_PUBLIC_URL!,
  handle: "@MakeNFTweet",
};

export const MetadataContext = createContext<MetadataContextProps>(
  defaultMetadataContext
);

export const useMetadataContext = () => useContext(MetadataContext);

type MetadataProviderProps = {
  children: ReactNode;
};

export function MetadataProvider({ children }: MetadataProviderProps) {
  return (
    <MetadataContext.Provider value={defaultMetadataContext}>
      {children}
    </MetadataContext.Provider>
  );
}
