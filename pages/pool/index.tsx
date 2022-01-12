import { NextPage } from "next";
import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";
import TabsFilter from "../../components/Common/TabsFilter";
import PoolInfo from "../../components/Pool/Info";
import PoolStakes from "../../components/Pool/Stakes";
import NewLayout from "../../components/UI/NewLayout";

const PoolPage: NextPage = () => {
  const options = useMemo(
    () => [
      {
        label: "Land",
        value: "land",
      },
      {
        label: "Business",
        value: "business",
      },
      {
        label: "Box",
        value: "box",
      },
    ],
    []
  );
  return (
    <NewLayout title="Pool">
      <TabsFilter options={options} />
      <PoolInfo />
      <PoolStakes />
    </NewLayout>
  );
};

export default memo(PoolPage, isEqual);
