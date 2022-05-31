import {
  sizeToDimensionsClassName,
  TailwindSize,
  classNames,
} from "lib/tailwind";

type AvatarSkeletonProps = {
  size?: TailwindSize;
};

export function AvatarSkeleton({ size = "md" }: AvatarSkeletonProps) {
  const dimensionClassNames = sizeToDimensionsClassName[size];

  const avatarSkeletonClassName = classNames(
    "rounded-lg bg-gray-300 animate-pulse",
    dimensionClassNames
  );

  return <div className={avatarSkeletonClassName} />;
}
