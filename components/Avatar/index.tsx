import {
  classNames,
  TailwindSize,
  sizeToDimensionsClassName,
} from "lib/tailwind";

import { AvatarSkeleton } from "./AvatarSkeleton";

type AvatarProps = {
  src: string;
  size?: TailwindSize;
  className?: string;
  loading?: boolean;
};

export function Avatar({ src, size = "md", className, loading }: AvatarProps) {
  const dimensionsClassName = sizeToDimensionsClassName[size];

  const avatarClassName = classNames(
    "relative not-prose rounded-full overflow-hidden flex items-center flex-shrink-0",
    dimensionsClassName,
    className
  );

  if (loading) {
    return <AvatarSkeleton size={size} />;
  }

  return (
    <div className={avatarClassName}>
      <img
        src={src}
        alt={src}
        className="absolute top-1/2 w-full -translate-y-1/2"
      />
    </div>
  );
}
