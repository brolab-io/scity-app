import type { NextPage } from "next";
import OurGameplayFeatures from "../components/Home/OurGameplayFeatures";
import Testimoni from "../components/Home/Testimoni";
import Feature from "../components/Home/Feature";
import BackgroundImage from "../components/Home/BackgroundImage";
import { getOpenedCities } from "../lib/api";
import { ICityData } from "../lib/types";
import SCCTokenomics from "../components/Home/SCCTokenomics";
import TokenomicsStatistics from "../components/Home/TokenomicsStatistics";
import RoadMap from "../components/Home/RoadMap";
import HomeAbout from "../components/Home/About";
import InfinityTown from "../components/Home/InfinityTown";
import styles from "../styles/Home.module.css";
import StayUpToDate from "../components/Home/StayUpToDate";
import Partner from "../components/Home/Partner";
import LandingLayout from "../components/UI/LandingLayout";

export const getServerSideProps = async () => {
  try {
    const cities = await getOpenedCities();
    return {
      props: { cities },
    };
  } catch ({ message }) {
    return { props: { error: { message }, cities: [] } };
  }
};

type Props = {
  cities: ICityData[];
};

const Home: NextPage<Props> = ({ cities }) => {
  return (
    <LandingLayout>
      <div className={styles.background}>
        {/* <Sample /> */}
        {/* <HeroSection /> */}
        <InfinityTown />
        {/* <BuyNFTLandSlider /> */}
        <HomeAbout />
        <Testimoni cities={cities} />

        <Feature />
        <OurGameplayFeatures />
        <BackgroundImage />
        <SCCTokenomics />
        <TokenomicsStatistics />
        <RoadMap />
        <Partner />
        <StayUpToDate />
      </div>
    </LandingLayout>
  );
};

export default Home;
