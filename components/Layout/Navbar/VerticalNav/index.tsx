import { useRouter } from "next/router";

import { INavItem } from "components/Layout";

import {
  classNames,
  downsize,
  sizeToDimensionsClassName,
  sizeToFontSizeClassName,
  TailwindSize,
} from "lib/tailwind";

type VerticalNavProps = {
  navGroups: INavItem[][];
  className?: string;
  onClick?: () => void;
  size?: TailwindSize;
};

export function VerticalNav({
  className,
  navGroups,
  onClick,
  size = "md",
}: VerticalNavProps) {
  const router = useRouter();
  const verticalNavClassName = classNames(
    "prose dark:prose-invert max-w-none divide-y divide-dark-light",
    className
  );

  const iconSizeClassName = sizeToDimensionsClassName[downsize(size)];
  const fontSizeClassName = sizeToFontSizeClassName[size];

  const handleClickNavItem = (item: INavItem) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.onClick) {
      item.onClick();
    }
    onClick && onClick();
  };

  return (
    <nav className={verticalNavClassName}>
      {navGroups.map((group, i) => (
        <div key={i} className="space-y-2">
          {group.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClickNavItem(item)}
              className={classNames(
                item.current
                  ? "bg-dark-light"
                  : "dark:hover:bg-dark-light hover:bg-light-accent",
                "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium no-underline"
              )}
            >
              <item.icon
                className={classNames(
                  "-ml-1 mr-3 flex-shrink-0",
                  iconSizeClassName
                )}
                aria-hidden="true"
              />
              <p className={classNames("my-0 truncate", fontSizeClassName)}>
                {item.name}
              </p>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}
