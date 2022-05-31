import { classNames, TailwindSize } from "lib/tailwind";

import { Avatar } from "../Avatar";

type AvatarGroupProps = {
  size?: TailwindSize;
  loading: boolean;
  src: string[];
};

const sizeToSpaceClassName = {
  xs: "-space-x-3",
  sm: "-space-x-4",
  md: "-space-x-5",
  lg: "-space-x-6",
  xl: "-space-x-8",
  "2xl": "-space-x-10",
  "3xl": "-space-x-12",
  "4xl": "-space-x-14",
  "5xl": "-space-x-16",
  "6xl": "-space-x-18",
  "7xl": "-space-x-20",
};

export function AvatarGroup({ size = "md", src, loading }: AvatarGroupProps) {
  const spaceClassName = sizeToSpaceClassName[size];
  const avatarGroupClassName = classNames(
    "flex overflow-hidden",
    spaceClassName
  );

  return (
    <div className={avatarGroupClassName}>
      {src.map((s) => (
        <Avatar size={size} src={s} key={s} loading={loading} />
      ))}
    </div>
  );
}
