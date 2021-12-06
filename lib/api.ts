import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { ICardData } from "./types";

const request = axios.create({
  baseURL: "https://api.scity.games",
});

export const getNFTLandMetaData = (
  queryContext: QueryFunctionContext<[string, string]>
): Promise<ICardData> => {
  return request
    .get(queryContext.queryKey[1])
    .then((response) => response.data);
};

export const getOpenedCities = () => {
  return request
    .get("/nft-cities/openedCities")
    .then((response) => response.data);
};
