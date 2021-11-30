import clsx from "clsx";
import { useState } from "react";
import Clickable from "../UI/Clickable";
import Container from "../UI/Container";
import Dropdown from "../UI/Dropdown";

type Props<T, K> = {
  filter: T;
  sortBy: K;
  setFilter: (filter: T) => void;
  setSortBy: (sortBy: K) => void;
  filters: Record<string, any>;
  sortBys: Record<string, any>;
};

const InventoryFilter = <T extends unknown, K extends unknown>({
  filter,
  sortBy,
  setFilter,
  setSortBy,
  filters,
  sortBys,
}: Props<T, K>) => {
  return (
    <Container className="flex justify-between px-4 pt-12 pb-6 lg:p-6 xl:p-8">
      <div className="flex space-x-2">
        {(Object.keys(filters) as Array<keyof typeof filters>).map((key) => (
          <Clickable
            key={key}
            onClick={() => setFilter(key as T)}
            className={clsx(
              "px-4 py-2 rounded text-white",
              filter === key ? "bg-primary" : "bg-dark-gray",
              "hover:bg-primary"
            )}
          >
            <span>{key[0].toUpperCase() + key.substr(1)}</span>
          </Clickable>
        ))}
      </div>
      <div className="flex space-x-2">
        <div>
          <Dropdown
            selectedItem="topRate"
            items={Object.keys(sortBys) as Array<keyof typeof sortBys>}
          />
        </div>
      </div>
    </Container>
  );
};

export default InventoryFilter;
