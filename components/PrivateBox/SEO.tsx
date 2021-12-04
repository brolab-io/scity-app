import { NextSeo } from "next-seo";
import { memo } from "react";
import isEqual from "react-fast-compare";

type Props = {};

const PrivateBoxSEO: React.FC<Props> = () => {
  return <NextSeo title="Buy Private Box - Private Sale" />;
};

export default memo(PrivateBoxSEO, isEqual);
