import { NextPage } from "next";
import { memo } from "react";
import isEqual from "react-fast-compare";
import MarketHistoryList from "../../components/MarketHistory/HistoryList";
import NewLayout from "../../components/UI/NewLayout";

const MarketHistorypage: NextPage = () => {
  return (
    <NewLayout title="Market History">
      <MarketHistoryList />
    </NewLayout>
  );
};

export default memo(MarketHistorypage, isEqual);
