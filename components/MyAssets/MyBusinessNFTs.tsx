import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { ContractTypes } from "../../dapp/near.config";
import useNearContractQuery from "../../hooks/useNearContractQuery";
import { getLandNFTsByOwner } from "../../lib/api";
import EmptyList from "../Common/EmptyList";
import NFTCard, { CardBasicInfo, CardPriceInfo } from "../Common/NFTCard";
import { useNearContext } from "../NearContext";
import LoadingWithLogo from "../UI/LoadingWithLogo";
import Pagination from "../UI/Pagination";

type Props = {
  openSellModal?: (nft: any) => void;
};

const MyBusinessNFTs: React.FC<Props> = ({ openSellModal }) => {
  const { account } = useNearContext();

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_COUNT = 8;

  const { data: businesses, isLoading } = useNearContractQuery<any[]>(
    ContractTypes.BUSINESS,
    "nft_tokens_for_owner",
    {
      account_id: account?.accountId,
      from_index: ((currentPage - 1) * PAGE_COUNT).toString(),
      limit: PAGE_COUNT.toString(),
    },
    {
      enabled: !!account,
    }
  );

  const { data: totalLands } = useNearContractQuery<number>(
    ContractTypes.BUSINESS,
    "nft_supply_for_owner",
    {
      account_id: account?.accountId,
    },
    {
      enabled: !!account,
    }
  );

  const totalPages = Math.ceil((totalLands || 0) / PAGE_COUNT);

  return (
    <div>
      {/* LOADING ON FETCH */}
      {isLoading ? <LoadingWithLogo className="flex justify-center py-40" /> : null}

      {/*  */}
      {!isLoading && !businesses?.length ? (
        <EmptyList className="flex justify-center py-40" message={`No land`} />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:grid-cols-4">
        {businesses?.map(({ metadata, token_id }, index) => {
          return (
            <NFTCard
              key={index}
              onClickSell={openSellModal}
              metadata={metadata}
              allowSell
              allowStake
              CardHeader={<CardBasicInfo title="Level" value={metadata.level ?? 0} />}
              CardFooter={
                <>
                  <CardBasicInfo
                    title="Mining Efficiency"
                    value={metadata.mining_efficiency ?? 0}
                  />
                  <CardPriceInfo title="Mining Power" value={metadata.mining_power ?? 0} />
                </>
              }
            ></NFTCard>
          );
        })}
      </div>
      {totalPages ? (
        <Pagination
          pageCount={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className="py-4"
        />
      ) : null}
    </div>
  );
};

export default MyBusinessNFTs;
