import { NextPage } from "next";
import CommingSoon from "../../components/Common/CommingSoon";
import NewLayout from "../../components/UI/NewLayout";

const BuySCCPage: NextPage = () => {
  return (
    <NewLayout title="Buy SCC">
      <CommingSoon />
    </NewLayout>
  );
};

export default BuySCCPage;
