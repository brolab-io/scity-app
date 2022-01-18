import { NextPage } from "next";
import { NextSeo } from "next-seo";
import CommingSoon from "../../components/Common/CommingSoon";
import NewLayout from "../../components/UI/NewLayout";

const FarmingPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Farming" />
      <NewLayout title="Farming">
        <CommingSoon />
      </NewLayout>
    </>
  );
};

export default FarmingPage;
