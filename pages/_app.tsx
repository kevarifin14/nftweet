import "@solana/wallet-adapter-react-ui/styles.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "styles/globals.css";

import { Providers } from "components/Providers";
import { Seo } from "components/Seo";

import { analytics, IS_PRODUCTION } from "lib/analytics";

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
  const router = useRouter();

  useEffect(() => {
    if (IS_PRODUCTION) {
      analytics.page();
      router.events.on("routeChangeComplete", () => analytics.page());
    }

    return () => {
      if (IS_PRODUCTION) {
        router.events.off("routeChangeComplete", () => analytics.page());
      }
    };
  }, [router.events]);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Providers session={session}>
      <Toaster />

      <Seo />

      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}
