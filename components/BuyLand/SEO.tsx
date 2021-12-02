import { NextSeo } from "next-seo";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { ICityData } from "../../lib/types";

type Props = {
  selectedCity?: ICityData | null;
};

const BuyLandSeo: React.FC<Props> = ({ selectedCity }) => {
  return <NextSeo title={selectedCity ? `Buy Land In ${selectedCity.name}` : "Buy Land"} />;
};

export default memo(BuyLandSeo, isEqual);
