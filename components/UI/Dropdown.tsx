import clsx from "clsx";
import { memo } from "react";
import isEqual from "react-fast-compare";
import SvgChevronDown from "../Icons/SvgChevronDown";
import Clickable from "./Clickable";

type Props<T> = {
  items: T[];
  selectedItem?: T;

  onItemSelected?: (item: T) => void;
  keyExtractor?: (item: T) => string;
  itemKey?: string;
  getItemLabel?: (item: T) => string;
};

const Dropdown = <T extends Record<string, any> | string>(props: Props<T>) => {
  const {
    items,
    onItemSelected,
    selectedItem,
    keyExtractor,
    itemKey,
    getItemLabel,
  } = props;
  return (
    <div className="group">
      <div className="relative">
        <div className="flex items-center px-4 py-2 text-white rounded bg-dark-gray group-hover:rounded-none">
          Sort by <SvgChevronDown className="ml-1.5" />
        </div>
        <div className={clsx("absolute z-20 hidden group-hover:block w-full")}>
          {items.map((item, index) => (
            <Clickable
              key={(keyExtractor && keyExtractor(item)) || index}
              className={clsx(
                "px-4 py-2 text-white hover:bg-primary",
                selectedItem === item ||
                  (itemKey &&
                    typeof selectedItem !== "string" &&
                    typeof item !== "string" &&
                    selectedItem?.[itemKey] === item[itemKey])
                  ? "bg-primary"
                  : "bg-dark-gray",
                {
                  "rounded-b": index === items.length - 1,
                }
              )}
            >
              <span className="capitalize">
                {getItemLabel
                  ? getItemLabel(item)
                  : itemKey && typeof item !== "string"
                  ? item[itemKey]
                  : item}
              </span>
            </Clickable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Dropdown, isEqual);
