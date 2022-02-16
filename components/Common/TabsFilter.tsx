import clsx from "clsx";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import isEqual from "react-fast-compare";

type FilterOption = {
  label: string;
  value: string | number;
};
type ItemProps = {
  activeFilter: FilterOption;
  setActiveFilter: (filter: FilterOption) => void;
  active: boolean;
};
const FilterItem: React.FC<ItemProps> = ({ activeFilter, setActiveFilter, active }) => {
  const onClick = useCallback(() => {
    setActiveFilter(activeFilter);
  }, [activeFilter, setActiveFilter]);
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 border-b-[3px] transition-all",
        active ? "border-b-[#7A50E1]" : "border-b-transparent"
      )}
    >
      <span className={clsx("text-[#A0AEC0] font-medium text-[14px]", active && "text-magenta")}>
        {activeFilter.label}
      </span>
    </button>
  );
};

type Props = {
  options: FilterOption[];
  onChange?: (filter: FilterOption) => void;
};

const TabsFilter: React.FC<Props> = ({ options, onChange }) => {
  const [activeFilter, setActiveFilter] = useState(options[0]);

  useEffect(() => {
    onChange?.(activeFilter);
  }, [activeFilter, onChange]);

  return (
    <div className="flex gap-x-1">
      {options.map((item) => (
        <FilterItem
          active={activeFilter.value === item.value}
          key={item.value}
          activeFilter={item}
          setActiveFilter={setActiveFilter}
        />
      ))}
    </div>
  );
};

export default memo(TabsFilter, isEqual);
