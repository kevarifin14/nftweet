import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { HiX } from "react-icons/hi";

import { classNames } from "lib/tailwind";

import Overlay from "./Overlay";

export interface ModalProps {
  open: boolean;
  children?: ReactNode;
  onClose?: () => void;
  title?: string;
  closable?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  closable = true,
  className,
}: ModalProps) {
  const handleClose = () => {
    if (closable && onClose) {
      onClose();
    }
  };

  const dialogClassName = classNames(
    "fixed z-20 inset-0 overflow-y-auto flex items-center justify-center min-h-screen dark"
  );

  const modalClassName = classNames(
    "bg-light dark:bg-dark dark:border-dark-accent border w-full max-w-sm transform overflow-hidden rounded-lg p-4 transition-all",
    className
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        static
        as="div"
        className={dialogClassName}
        open={open}
        onClose={handleClose}
      >
        <Overlay />

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className={modalClassName}>
            {(closable || title) && (
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <HiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            )}

            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
