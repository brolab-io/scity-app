import type { NextPage } from "next";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto py-20 h-screen flex flex-col">
      <Header />
    </div>
  );
};

export default Home;
