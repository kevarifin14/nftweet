import { Users } from "generated";
import { shortenAddress } from "lib";

import { MediaObject } from "components/MediaObject";

import { TailwindSize } from "lib/tailwind";

type UserMediaObjectProps = {
  user: Users;
  vertical?: boolean;
  size?: TailwindSize;
};

export function UserMediaObject({
  user,
  vertical,
  size,
}: UserMediaObjectProps) {
  return (
    <MediaObject
      title={user?.name}
      src={user?.image!}
      description={
        user.wallets.length ? shortenAddress(user?.wallets[0].key!) : ""
      }
      vertical={vertical}
      size={size}
      loading={!user}
    />
  );
}
