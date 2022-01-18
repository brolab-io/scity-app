import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import NFTCard from "../../components/Common/NFTCard";
import SvgClockIcon from "../../components/Icons/SvgClockIcon";
import MarketPlaceFilter from "../../components/MarketPlace/Filter";
import NewLayout from "../../components/UI/NewLayout";
import Pagination from "../../components/UI/Pagination";

const Marketplace: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <NextSeo title="Marketplace" />
      <NewLayout title="Marketplace">
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
    </>
  );
};

export default memo(Marketplace, isEqual);
