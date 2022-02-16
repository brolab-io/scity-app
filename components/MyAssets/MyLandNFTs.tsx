import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { getLandNFTsByOwner } from "../../lib/api";
import EmptyList from "../Common/EmptyList";
import NFTCard, { CardBasicInfo, CardPriceInfo } from "../Common/NFTCard";
import LoadingWithLogo from "../UI/LoadingWithLogo";
import Pagination from "../UI/Pagination";

type Props = {
  openSellModal?: (nft: any) => void;
};

const MyLandNFTs: React.FC<Props> = ({ openSellModal }) => {
  const { account } = useWeb3React<Web3Provider>();

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_COUNT = 8;

  const { data, isLoading } = useQuery(
    ["lands", account!, currentPage, PAGE_COUNT],
    getLandNFTsByOwner,
    {
      enabled: !!account,
      keepPreviousData: true,
    }
  );

  return (
    <div>
      {/* LOADING ON FETCH */}
      {isLoading ? <LoadingWithLogo className="flex justify-center py-40" /> : null}

      {/*  */}
      {!isLoading && !data?.items.length ? (
        <EmptyList className="flex justify-center py-40" message={`No land`} />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:grid-cols-4">
        {data?.items.map((metadata, index) => {
          const attributes = metadata.attributes.reduce((acc, curr) => {
            acc[curr.trait_type] = curr.value;
            return acc;
          }, {} as Record<string, string | number>);
          return (
            <NFTCard
              key={index}
              onClickSell={openSellModal}
              metadata={metadata}
              attributes={attributes}
              allowSell
              allowStake
              CardFooter={
                <>
                  <CardBasicInfo
                    title="Mining Efficiency"
                    value={attributes.miningEfficiency ?? 0}
                  />
                  <CardPriceInfo title="Mining Power" value={attributes.miningPower ?? 0} />
                </>
              }
            ></NFTCard>
          );
        })}
      </div>
      {data?.totalPages ? (
        <Pagination
          pageCount={data.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className="py-4"
        />
      ) : null}
    </div>
  );
};

export default MyLandNFTs;
