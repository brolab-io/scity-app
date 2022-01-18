import { NextPage } from "next";
import { NextSeo } from "next-seo";
import CommingSoon from "../../components/Common/CommingSoon";
import NewLayout from "../../components/UI/NewLayout";

const BuySCCPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Buy SCC" />
      <NewLayout title="Buy SCC">
        <CommingSoon />
      </NewLayout>
    </>
  );
};

export default BuySCCPage;
