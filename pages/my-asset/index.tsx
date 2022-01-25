import { NextPage } from "next";
import { memo, useCallback, useMemo, useState, useRef } from "react";
import isEqual from "react-fast-compare";
import NFTCard, { CardBasicInfo, CardPriceInfo } from "../../components/Common/NFTCard";
import Pagination from "../../components/UI/Pagination";
import TabsFilter from "../../components/Common/TabsFilter";
import NewLayout from "../../components/UI/NewLayout";
import SellNFTModal, { SellNFTModalRef } from "../../components/MyNFT/SellNFTModal";
import { NextSeo } from "next-seo";

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

const MyAssetsPage: NextPage = () => {
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
  const modalRef = useRef<SellNFTModalRef>(null);

  const openSellModal = useCallback((nft) => {
    modalRef.current?.openModal(nft);
  }, []);

  return (
    <>
      <NextSeo title="My Assets" />
      <NewLayout title="My Assets">
        <TabsFilter options={options} />
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:grid-cols-4">
          {new Array(8).fill(0).map((_, index) => (
            <NFTCard
              key={index}
              onClickSell={openSellModal}
              metadata={testMetadata}
              allowSell
              allowStake
              href={`marketplace/nft_${index}`}
              CardHeader={<></>}
              CardFooter={
                <>
                  <CardBasicInfo title="Mining Efficiency" value={`130%`} />
                  <CardPriceInfo title="Mining Power" value={`50`} />
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
      <SellNFTModal ref={modalRef} />
    </>
  );
};

export default memo(MyAssetsPage, isEqual);
