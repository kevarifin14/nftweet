import { useCurrentUser } from "contexts/currentUser";
import { signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { HiLogout } from "react-icons/hi";

import { Button } from "components/Button";

import { INavItem } from "..";
import { GmButton } from "./GmButton";
import { SessionPopover } from "./SessionPopover";

export function Navbar() {
  const { currentUser } = useCurrentUser();
  const navItems: INavItem[] = [
    {
      name: "Logout",
      icon: HiLogout,
      onClick: signOut,
    },
  ];

  return (
    <nav className="mx-auto flex max-w-7xl pt-8 items-center justify-center relative">
      <div className="flex-1">
        <Link href="/">
          <a className="text-2xl">✍️ NFTweet</a>
        </Link>
      </div>

      <div className="flex space-x-4">
        <GmButton />
        {currentUser ? (
          <SessionPopover navItems={navItems} />
        ) : (
          <Button type="primary" onClick={() => signIn("twitter")}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}
