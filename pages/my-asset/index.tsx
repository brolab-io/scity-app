import { NextPage } from "next";
import { memo, useCallback, useMemo, useState, useRef, useEffect } from "react";
import isEqual from "react-fast-compare";
import NFTCard, { CardBasicInfo, CardPriceInfo } from "../../components/Common/NFTCard";
import Pagination from "../../components/UI/Pagination";
import TabsFilter from "../../components/Common/TabsFilter";
import NewLayout from "../../components/UI/NewLayout";
import SellNFTModal, { SellNFTModalRef } from "../../components/MyAssets/SellNFTModal";
import { NextSeo } from "next-seo";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { getLandNFTsByOwner } from "../../lib/api";
import LoadingWithLogo from "../../components/UI/LoadingWithLogo";
import EmptyList from "../../components/Common/EmptyList";
import MyLandNFTs from "../../components/MyAssets/MyLandNFTs";
import MyBusinessNFTs from "../../components/MyAssets/MyBusinessNFTs";
import MyBoxNFTs from "../../components/MyAssets/MyBoxNFTs";

const MyAssetsPage: NextPage = () => {
  const options = useMemo(
    () => [
      {
        label: "Land",
        value: "lands",
      },
      {
        label: "Business",
        value: "businesses",
      },
      {
        label: "Box",
        value: "boxes",
      },
    ],
    []
  );
  const [activeFilter, setActiveFilter] = useState(options[0]);

  const modalRef = useRef<SellNFTModalRef>(null);

  const openSellModal = useCallback((nft) => {
    modalRef.current?.openModal(nft);
  }, []);

  const onFilterChange = useCallback((option) => {
    setActiveFilter(option);
  }, []);

  return (
    <>
      <NextSeo title="My Assets" />
      <NewLayout title="My Assets">
        <TabsFilter onChange={onFilterChange} options={options} />

        {activeFilter.value === options[0].value ? (
          <MyLandNFTs openSellModal={openSellModal} />
        ) : null}

        {activeFilter.value === options[1].value ? (
          <MyBusinessNFTs openSellModal={openSellModal} />
        ) : null}

        {activeFilter.value === options[2].value ? <MyBoxNFTs /> : null}
      </NewLayout>
      <SellNFTModal ref={modalRef} />
    </>
  );
};

export default memo(MyAssetsPage, isEqual);
