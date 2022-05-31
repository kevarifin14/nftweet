import ReactMarkdown from "react-markdown";

import {
  classNames,
  sizeToFontSizeClassName,
  downsize,
  TailwindSize,
  sizeToSpaceYClassName,
} from "lib/tailwind";

import { LineSkeleton } from "./LineSkeleton";

export type HeaderProps = {
  title: string;
  size?: TailwindSize;
  description?: string;
  cta?: string;
  ctaOnClick?: () => void;
  vertical?: boolean;
  className?: string;
  loading?: boolean;
  centered?: boolean;
};

export function Header({
  title,
  size = "2xl",
  description,
  cta,
  ctaOnClick,
  vertical,
  className,
  centered,
  loading,
}: HeaderProps) {
  const headerClassName = classNames(
    "prose dark:prose-invert max-w-none flex whitespace-normal",
    vertical ? "flex-col space-y-2" : "items-center justify-between",
    centered ? "flex-col justify-center text-center" : "text-left",
    className
  );

  const headerFontSizeClassName = sizeToFontSizeClassName[size];
  const subHeaderFontSizeClassName = sizeToFontSizeClassName[downsize(size, 0)];
  const ctaFontSizeClassName = sizeToFontSizeClassName[downsize(size, 1)];

  if (loading) {
    return (
      <div className="space-y-1">
        <LineSkeleton className={classNames(headerFontSizeClassName, "w-32")} />
        <LineSkeleton
          className={classNames(subHeaderFontSizeClassName, "w-16")}
        />
      </div>
    );
  }

  return (
    <div className={headerClassName}>
      <div className={sizeToSpaceYClassName[size]}>
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 {...props} className={classNames("my-0")} />
            ),
          }}
          className={headerFontSizeClassName}
        >
          {`## ${title}`}
        </ReactMarkdown>

        {description && (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p {...props} className={classNames("my-0")} />
              ),
            }}
            className={classNames(
              subHeaderFontSizeClassName,
              sizeToSpaceYClassName[size]
            )}
          >
            {description}
          </ReactMarkdown>
        )}
      </div>

      {cta && ctaOnClick && (
        <div className="flex-shrink-0">
          <button
            className={classNames("text-primary", ctaFontSizeClassName)}
            onClick={ctaOnClick}
          >
            {cta}
          </button>
        </div>
      )}
    </div>
  );
}
