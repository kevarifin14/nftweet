import { ReactNode } from "react";

import { classNames, sizeToPaddingClassName, TailwindSize } from "lib/tailwind";

type CardProps = {
  children: ReactNode;
  className?: string;
  size?: TailwindSize;
  noPadding: boolean;
};

export function Card({
  className,
  children,
  size = "md",
  noPadding,
}: CardProps) {
  const cardClassName = classNames(
    "bg-light-dark dark:bg-dark-light rounded-md",
    noPadding ? "" : sizeToPaddingClassName[size],
    className
  );

  return <div className={cardClassName}>{children}</div>;
}
