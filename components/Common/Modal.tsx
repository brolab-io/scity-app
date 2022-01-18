import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, memo } from "react";
import isEqual from "react-fast-compare";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode | Element | Element[];
  className?: string;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, children, className }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto custom-scrollbar"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={clsx(
                className,
                "inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#1A202C] shadow-xl rounded-2xl"
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(Modal, isEqual);
