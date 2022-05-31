import "@solana/wallet-adapter-react-ui/styles.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "styles/globals.css";

import { Providers } from "components/Providers";
import { Seo } from "components/Seo";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Providers session={session}>
      <Toaster />

      <Seo />

      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}
