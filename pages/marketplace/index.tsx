import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import NFTCard, {
  CardBasicInfo,
  CardPriceInfo,
  CardPriceInSCC,
} from "../../components/Common/NFTCard";
import MarketPlaceFilter from "../../components/MarketPlace/Filter";
import NewLayout from "../../components/UI/NewLayout";
import Pagination from "../../components/UI/Pagination";

const testMetadata: LandNFT = {
  attributes: [
    {
      trait_type: "name",
      value: "Hong Kong #1",
    },
    {
      trait_type: "city",
      value: "Hong Kong",
    },
    {
      trait_type: "location",
      value: "0,0",
    },
    {
      trait_type: "rare",
      value: "SR",
    },
    {
      trait_type: "miningPower",
      value: 16,
    },
    {
      trait_type: "miningEfficiency",
      value: 147,
    },
  ],
  hash: "e7c18cf2367345753b3be8a3ef112907a97c30053239d0cace4b048d5dfb6e39",
  name: "Hong Kong #1",
  description: null,
  ownerAddress: "0x0",
  image: "https://res.cloudinary.com/dcrbaasbt/image/upload/v1637838193/Group_329_ufuao2.png",
};

const Marketplace: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <NextSeo title="Marketplace" />
      <NewLayout title="Marketplace">
        <MarketPlaceFilter />
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:grid-cols-4">
          {new Array(8).fill(0).map((_, index) => (
            <NFTCard
              key={index}
              metadata={testMetadata}
              href={`marketplace/nft_${index}`}
              CardHeader={
                <>
                  <CardBasicInfo title="Mining Efficiency" value={`130%`} />
                  <CardPriceInfo title="Mining Power" value={`50`} />
                </>
              }
              CardFooter={
                <>
                  <CardBasicInfo title="Sale Price" value={`~ $2.566`} />
                  <CardPriceInSCC value="6.250" />
                </>
              }
            ></NFTCard>
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
