import type { NextPage } from "next";

import Container from "../components/UI/Container";

const Custom404: NextPage = () => {
  return (
    <div className="py-20 bg-black h-screen">
      <Container className="px-4 py-20 mt-20 md:px-6 lg:px-8 xl:px-10">
        <div className="space-y-6 text-center">
          <h3 className="space-x-4 text-xl font-extrabold lg:text-2xl xl:text-3xl 2xl:text-4xl">
            <span className="text-purple-600">THE SOCIALVERSE CITY</span>
            <span className="text-white">Coming Soon .......</span>
          </h3>
        </div>
      </Container>
    </div>
  );
};

export default Custom404;
