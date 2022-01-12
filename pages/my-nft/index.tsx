import { NextPage } from "next";
import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import NFTCard from "../../components/Common/NFTCard";
import Container from "../../components/UI/Container";
import Pagination from "../../components/UI/Pagination";
import MyNFTFilter from "../../components/MyNFT/Filter";

const MyNFTPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="bg-[#171923] pt-16 min-h-screen">
      <Container className="px-4 py-10 md:py-12 lg:py-16 space-y-6 md:px-8 xl:px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white title">My NFT</h1>
        </div>
        <MyNFTFilter />
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:grid-cols-4">
          {new Array(8).fill(0).map((_, index) => (
            <NFTCard key={index}></NFTCard>
          ))}
        </div>
        <Pagination
          pageCount={20}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className="py-4"
        />
      </Container>
    </div>
  );
};

export default memo(MyNFTPage, isEqual);
