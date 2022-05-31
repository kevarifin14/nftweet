import { Popover } from "@headlessui/react";
import { useCurrentUser } from "contexts/currentUser";

import { Avatar } from "components/Avatar";
import { INavItem } from "components/Layout";

import { SessionPopoverPanel } from "./SessionPopoverPanel";

type SessionPopoverProps = {
  navItems: INavItem[];
};

export function SessionPopover({ navItems }: SessionPopoverProps) {
  const { currentUser } = useCurrentUser();

  return (
    <Popover as="div">
      <Popover.Button>
        <Avatar src={currentUser?.image!} />
      </Popover.Button>

      <SessionPopoverPanel
        className="absolute right-0 mt-2 w-64 z-10"
        navItems={navItems}
      />
    </Popover>
  );
}
