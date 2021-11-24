import axios, { AxiosRequestConfig } from "axios";

const fetcher = <T extends {} = {}, P extends undefined = undefined>(
  url: string,
  params: T,
  body: P,
  config: AxiosRequestConfig = {}
) => {
  return axios({
    url,
    params,
    data: body,
    ...config,
  }).then((response) => response.data);
};

export default fetcher;
