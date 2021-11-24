import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";

type Props = {
  rows: number;
  columns: number;
};

const createArray = (length: number) =>
  new Array(length).fill(null).map((_, i) => i);

const LandMaps: React.FC<Props> = ({ rows, columns }) => {
  const styles = useMemo(
    () => ({
      backgroundImage: `url("/images/countries/hong-kong.svg")`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }),
    []
  );
  return (
    <div>
      <div style={styles} className="divide-y-2 divide-white divide-sold">
        {createArray(rows).map((row) => (
          <div
            key={`row-${row}`}
            className="flex divide-x-2 divide-white divide-sold"
          >
            {createArray(columns).map((col) => (
              <div
                key={`col-${col}`}
                className="flex flex-1 p-4 py-6 cursor-pointer transition-all bg-opacity-50 bg-gray-500 hover:bg-green-400 hover:bg-opacity-80"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturePath: React.FC<any> = ({ d }) => {
  return (
    <path
      d={d}
      fill="#dedede"
      fillOpacity="0.3"
      stroke="black"
      strokeDasharray="3"
      cursor="pointer"
      className="states"
    />
  );
};

export default memo(LandMaps, isEqual);
