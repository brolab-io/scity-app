import { NextPage } from "next";
import CommingSoon from "../../components/Common/CommingSoon";
import NewLayout from "../../components/UI/NewLayout";

const FarmingPage: NextPage = () => {
  return (
    <NewLayout title="Farming">
      <CommingSoon />
    </NewLayout>
  );
};

export default FarmingPage;
