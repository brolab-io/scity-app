import clsx from "clsx";
import { memo, useState, Fragment } from "react";
import isEqual from "react-fast-compare";
import { Listbox, Transition } from "@headlessui/react";
import SvgCheck from "../Icons/SvgCheck";
import SvgChevronDown from "../Icons/SvgChevronDown";

type Option = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  options: Option[];
};

const Select: React.FC<Props> = ({ className, options }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className={clsx(className, "relative")}>
            <span className="flex items-center">
              <span className="block ml-3 truncate">{selected.label}</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-6 ml-3 pointer-events-none">
              <SvgChevronDown className={clsx("w-4 h-4", open && "rotate-180")} />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-[#1A202C] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active, selected }) =>
                    clsx(
                      "cursor-default select-none relative py-4 pl-3 pr-9 text-white",
                      active && "bg-[#2D3748]",
                      selected && "text-magenta"
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span className={clsx("ml-3 block truncate")}>{option.label}</span>
                      </div>

                      {selected ? (
                        <span
                          className={clsx(
                            active ? "text-white" : "text-indigo-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <SvgCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default memo(Select, isEqual);
