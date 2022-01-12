import { NextPage } from "next";
import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import NFTCard from "../../components/Common/NFTCard";
import SvgClockIcon from "../../components/Icons/SvgClockIcon";
import MarketPlaceFilter from "../../components/MarketPlace/Filter";
import NewLayout from "../../components/UI/NewLayout";
import Pagination from "../../components/UI/Pagination";

const MarketPlace: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <NewLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-white title">MarketPlace</h1>
        <button className="rounded button button-magenta button-rounded button-outline">
          <SvgClockIcon className="w-3 h-3 md:h-4 md:w-4 lg:w-5 lg:h-5" />
          <span className="text-[12px] md:text-[14px] lg:text-[16px]">Market History</span>
        </button>
      </div>
      <MarketPlaceFilter />
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:grid-cols-4">
        {new Array(8).fill(0).map((_, index) => (
          <NFTCard key={index} href={`marketplace/nft_${index}`} sale></NFTCard>
        ))}
      </div>
      <Pagination
        pageCount={20}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className="py-4"
      />
    </NewLayout>
  );
};

export default memo(MarketPlace, isEqual);
