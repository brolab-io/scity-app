import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { ICardData } from "./types";

const request = axios.create({
  baseURL: "https://api.github.com",
});

export const getNFTLandMetaData = (
  queryContext: QueryFunctionContext<[string, string]>
): Promise<ICardData> => {
  return request
    .get(queryContext.queryKey[1])
    .then((response) => response.data);
};
