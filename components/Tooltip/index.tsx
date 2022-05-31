import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  text: string;
};

export function Tooltip({ children, text }: TooltipProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-x-1/2 z-10 -my-2 w-48 -translate-x-1/2 -translate-y-full transform duration-500 ease-in-out text-center ">
        <div className="bg-light-accent dark:bg-dark-accent rounded p-2 group-hover:inline-block hidden">
          <p className="text-sm inline-block">{text}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
