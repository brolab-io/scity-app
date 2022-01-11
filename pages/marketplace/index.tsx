import { NextPage } from "next";
import { memo } from "react";
import isEqual from "react-fast-compare";
import SvgClockIcon from "../../components/Icons/SvgClockIcon";
import MarketPlaceFilter from "../../components/MarketPlace/Filter";
import Container from "../../components/UI/Container";

const MarketPlace: NextPage = () => {
  return (
    <div className="bg-[#171923] pt-16 min-h-screen">
      <Container className="px-6 py-20 md:px-4 xxl:px-0">
        <div className="flex items-end justify-between">
          <h1 className="text-white title">MarketPlace</h1>
          <button className="rounded button button-magenta button-rounded">
            <SvgClockIcon className="w-5 h-5" />
            <span>Market History</span>
          </button>
        </div>
        <MarketPlaceFilter />
      </Container>
    </div>
  );
};

export default memo(MarketPlace, isEqual);
