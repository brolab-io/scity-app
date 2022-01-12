import { NextPage } from "next";
import { memo, useMemo, useState } from "react";
import isEqual from "react-fast-compare";
import NFTCard from "../../components/Common/NFTCard";
import Pagination from "../../components/UI/Pagination";
import TabsFilter from "../../components/Common/TabsFilter";
import NewLayout from "../../components/UI/NewLayout";

const MyNFTPage: NextPage = () => {
  const options = useMemo(
    () => [
      {
        label: "Land",
        value: "land",
      },
      {
        label: "Business",
        value: "business",
      },
      {
        label: "Box",
        value: "box",
      },
    ],
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <NewLayout title="My NFT">
      <TabsFilter options={options} />
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
    </NewLayout>
  );
};

export default memo(MyNFTPage, isEqual);
