import type { NextPage } from "next";
import Logo from "../Common/Logo";

const CommingSoon: NextPage = () => {
  return (
    <div className="space-y-6 flex justify-center flex-col items-center pt-20">
      <Logo width={200} height={200} />
      <h3 className="text-xl font-extrabold lg:text-2xl xl:text-3xl 2xl:text-4xl space-y-5 text-center">
        <span className="text-magenta block">THE SOCIALVERSE CITY</span>
        <span className="text-[#A0AEC0] block">Coming Soon .......</span>
      </h3>
    </div>
  );
};

export default CommingSoon;
