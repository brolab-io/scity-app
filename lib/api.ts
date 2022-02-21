import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { getAPIURL } from "../dapp/bsc.config";

const request = axios.create({
  baseURL: getAPIURL(),
});

type PaginationResponse<T> = {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
};

export const getNFTLandMetaData = (
  queryContext: QueryFunctionContext<[string, string, string]>
): Promise<LandNFT> => {
  return request
    .get(queryContext.queryKey[1], {
      params: { txHash: queryContext.queryKey[2] },
    })
    .then((response) => response.data);
};

export const getOpenedCities = () => {
  return request.get("/cities/openedCities").then((response) => response.data);
};

export const getLandNFTsByOwner = (
  queryContext: QueryFunctionContext<[string, string, number, number]>
): Promise<PaginationResponse<LandNFT>> => {
  return request
    .get(`/nft/${queryContext.queryKey[0]}`, {
      params: {
        address: queryContext.queryKey[1],
        page: queryContext.queryKey[2],
        pageSize: queryContext.queryKey[3],
      },
    })
    .then((response) => response.data);
};
