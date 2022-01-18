import type { NextPage } from "next";
import Logo from "../components/Common/Logo";

import Container from "../components/UI/Container";
import NewLayout from "../components/UI/NewLayout";

const Custom404: NextPage = () => {
  return (
    <NewLayout>
      <Container className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10">
        <div className="space-y-6 flex justify-center flex-col items-center">
          <Logo width={200} height={200} />
          <h3 className="space-x-4 text-xl font-extrabold lg:text-3xl xl:text-5xl 2xl:text-6xl space-y-7 text-center">
            <span className="text-purple-600 block">THE SOCIALVERSE CITY</span>
            <span className="text-white block">Coming Soon .......</span>
          </h3>
        </div>
      </Container>
    </NewLayout>
  );
};

export default Custom404;
