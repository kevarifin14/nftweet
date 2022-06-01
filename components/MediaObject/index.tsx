import { Header } from "components/Header";

import { classNames, downsize, TailwindSize } from "lib/tailwind";

import { AvatarGroup } from "../AvatarGroup";

export interface MediaObjectProps {
  title: string;
  src?: string;
  description?: string;
  size?: TailwindSize;
  className?: string;
  dark?: boolean;
  loading?: boolean;
  vertical?: boolean;
}

export function MediaObject({
  title,
  src,
  description,
  size,
  className,
  dark,
  loading,
  vertical,
}: MediaObjectProps) {
  const textClassName = dark ? "text-white" : "text-black";
  const mediaObjectClassName = classNames(
    "flex items-center",
    vertical ? "flex-col space-y-2 text-center" : "space-x-2",
    className
  );

  return (
    <div className={mediaObjectClassName}>
      {src && (
        <div className="flex-shrink-0">
          <AvatarGroup
            loading={loading || false}
            size={size}
            src={Array.isArray(src) ? src : [src]}
          />
        </div>
      )}

      <div
        className={classNames(
          "flex flex-col justify-center overflow-hidden",
          textClassName
        )}
      >
        <Header
          loading={loading}
          title={title}
          description={description}
          size={downsize(size, 3)}
        />
      </div>
    </div>
  );
}
