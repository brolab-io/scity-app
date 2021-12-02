import type { NextPage } from "next";
import HeroSection from "../components/Home/HeroSections";
import Sample from "../components/Home/Sample";
import BuyNFTLandSlider from "../components/Home/BuyNFTLandSlider";
import OurGameplayFeatures from "../components/Home/OurGameplayFeatures";
import Testimoni from "../components/Home/Testimoni";
import Feature from "../components/Home/Feature";
import BackgroundImage from "../components/Home/BackgroundImage";

const Home: NextPage = () => {
  return (
    <div className="pt-20 bg-black">
      {/* <Sample /> */}
      <HeroSection />
      {/* <BuyNFTLandSlider /> */}
      <Testimoni />
      <Feature />
      <OurGameplayFeatures />
      <BackgroundImage />
    </div>
  );
};

export default Home;
