import { useMemo } from "react";
import SvgSearchIcon from "../Icons/SvgSearchIcon";
import Select from "../UI/Select";

const MarketPlaceFilter = () => {
  const typeOptions = useMemo(
    () => [
      { value: "all", label: "All NFT" },
      { value: "land", label: "Land NFT" },
      { value: "box", label: "Box NFT" },
      { value: "company", label: "Company NFT" },
    ],
    []
  );
  const sortOptions = useMemo(
    () => [
      { value: "latest", label: "Latest Sale" },
      { value: "highest", label: "Highest Price" },
      { value: "lowest", label: "Lowest Price" },
    ],
    []
  );
  return (
    <div className="flex flex-col items-center justify-between py-2 mt-2 space-y-4 lg:space-y-0 lg:space-x-4 lg:py-3 lg:mt-3 xl:py-4 xl:mt-4 lg:flex-row">
      <div className="flex w-full space-x-4 lg:w-[46%] md:space-x-6 lg:space-x-8">
        <div className="w-[50%]">
          <Select className="w-full text-white bg-[#1A202C] select" options={typeOptions} />
        </div>
        <div className="w-[50%]">
          <Select className="w-full text-white bg-[#1A202C] select" options={sortOptions} />
        </div>
      </div>
      <div className="relative w-full max-w-full lg:w-96">
        <input
          placeholder="Search NFT Card"
          className="bg-[#1A202C] input input-rounded self-end text-white pl-14 w-full"
        />
        <span className="absolute inset-y-0 -translate-y-1/2 left-4 top-1/2">
          <SvgSearchIcon className="w-6 h-6" />
        </span>
      </div>
    </div>
  );
};

export default MarketPlaceFilter;
