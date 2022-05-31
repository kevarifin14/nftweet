import { useCurrentUser } from "contexts/currentUser";
import { useMetadataContext } from "contexts/metadata";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";

import { LoadingPage } from "components/Layout/LoadingPage";
import { Spin } from "components/Spin";

import { Heroicon } from "lib/tailwind";

import { Footer } from "./Footer";
import { LoginPage } from "./LoginPage";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

export type INavItem = {
  name: string;
  href?: string;
  icon: Heroicon;
  current?: boolean;
  onClick?: () => void;
};

export default function Layout({ children }: LayoutProps) {
  const { name } = useMetadataContext();
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main className="min-h-screen">
        <Navbar />

        {children}
      </main>
      <Footer />
    </>
  );
}

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
