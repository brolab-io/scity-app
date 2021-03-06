import { NextSeo } from "next-seo";
import { memo } from "react";
import isEqual from "react-fast-compare";

type Props = {};

const BuyBoxSeo: React.FC<Props> = () => {
  return <NextSeo title={`NFT Bussiness`} />;
};

export default memo(BuyBoxSeo, isEqual);
