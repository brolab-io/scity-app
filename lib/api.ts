import axios from "axios";
import { QueryFunctionContext } from "react-query";

const request = axios.create({
  baseURL: "https://api.github.com",
});

export const getNFTLandMetaData = (
  queryContext: QueryFunctionContext<[string, string]>
) => {
  return request
    .get(queryContext.queryKey[1])
    .then((response) => response.data);
};
