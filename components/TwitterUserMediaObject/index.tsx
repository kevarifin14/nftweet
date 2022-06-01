import { ReactNode } from "react";

import { classNames } from "lib/tailwind";

type TwitterUserMediaObjectProps = {
  children: ReactNode;
  className?: string;
};

export function TwitterUserMediaObject({
  className,
  children,
}: TwitterUserMediaObjectProps) {
  const twitterUserMediaObjectClassName = classNames(className);

  return <div className={twitterUserMediaObjectClassName}>{children}</div>;
}
