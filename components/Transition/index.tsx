import {
  Transition as HeadlessTransition,
  TransitionClasses,
} from "@headlessui/react";
import { ReactNode } from "react";

type TransitionType = "slideDown";

interface TransitionProps {
  type: TransitionType;
  children: ReactNode;
}

const transitionProps: Record<TransitionType, TransitionClasses> = {
  slideDown: {
    enter: "transition duration-200 origin-top",
    enterFrom: "transform scale-y-0",
    enterTo: "transform scale-y-100",
    leave: "transition duration-200 origin-top",
    leaveFrom: "transform scale-y-100",
    leaveTo: "transform scale-y-0",
  },
};

export function Transition({ type, children }: TransitionProps) {
  return (
    <HeadlessTransition {...transitionProps[type]}>
      {children}
    </HeadlessTransition>
  );
}
