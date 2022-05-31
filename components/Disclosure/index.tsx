import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import { ReactNode } from "react";
import { HiChevronUp } from "react-icons/hi";

import { Card } from "components/Card";
import { Transition } from "components/Transition";

// import { analytics, trackFaqQuestion } from "lib/analytics";
import { classNames, sizeToPaddingClassName } from "lib/tailwind";

type DisclosureProps = {
  title: string;
  children: ReactNode;
};

export function Disclosure({ title, children }: DisclosureProps) {
  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <div>
          <HeadlessDisclosure.Button
            className={classNames(
              "w-full rounded-lg-t rounded-lg-br text-left",
              "bg-light-light dark:bg-dark-light rounded-md",
              sizeToPaddingClassName["lg"]
            )}
          >
            <div
              className={classNames(
                "prose flex items-center justify-between w-full dark:prose-invert max-w-none"
              )}
            >
              <h3 className="my-0">{title}</h3>
              <div className="not-prose">
                <HiChevronUp
                  className={classNames(
                    "h-8 w-8 transform duration-200 dark:bg-dark-accent/50 bg-light-dark/50 rounded-full p-1",
                    open ? "rotate-180" : "rotate-0"
                  )}
                />
              </div>
            </div>
          </HeadlessDisclosure.Button>

          <Transition type="slideDown">
            <HeadlessDisclosure.Panel as={Card} size="lg" className="my-4 py-3">
              {children}
            </HeadlessDisclosure.Panel>
          </Transition>
        </div>
      )}
    </HeadlessDisclosure>
  );
}
