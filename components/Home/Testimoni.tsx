import React, { createRef, useCallback, useMemo, useState } from "react";

// import react slick
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import Container from "../UI/Container";
import useWindowSize from "../../hooks/useWindowSize";
import clsx from "clsx";
import Button from "../UI/Button";
import SvgArrowBack from "../Icons/SvgArrowBack";
import SvgArrowNext from "../Icons/SvgArrowNext";
import SliderArrow from "./SliderArrow";
import { ICityData } from "../../lib/types";
import Clickable from "../UI/Clickable";
import styles from "./Testimoni.module.css";

type Props = {
  cities: ICityData[];
};

const Testimoni: React.FC<Props> = ({ cities }) => {
  const [height, width] = useWindowSize();
  const [imageIndex, setImageIndex] = useState(0);
  const sliderRef = createRef<Slider>();

  const settings: Settings = useMemo(
    () => ({
      className: "center",
      centerMode: true,
      infinite: true,
      slidesToShow: width > 562 ? 3 : 1,
      centerPadding: "0px",
      beforeChange: (current, next) => {
        setImageIndex(next);
      },
      focusOnSelect: true,
      arrows: false,
    }),
    [width]
  );

  const onPressBack = useCallback(() => {
    sliderRef.current?.slickPrev();
  }, [sliderRef]);

  const onPressNext = useCallback(() => {
    sliderRef.current?.slickNext();
  }, [sliderRef]);

  return (
    <Container className="px-4 mt-20 lg:px-6 xl:px-8">
      <div className="flex flex-col">
        <div className={clsx("flex flex-col justify-center items-center")}>
          <h2
            className={clsx(styles.title, "text-white uppercase text-center")}
          >
            Buy NFT Land in your favorite city
          </h2>
          <h6
            className={clsx(
              styles.subtitle,
              "text-center text-sm text-gray-600  md:w-1/2"
            )}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown
          </h6>
        </div>
        <div className="relative flex py-8 lg:py-10 xl:py-16 2xl:py-20">
          <div className="relative w-full flex whitespace-nowrap lg:justify-center lg:items-center gap-6 overflow-x-auto overflow-y-hidden pb-4 lg:pb-14  snap-mandatory snap-x">
            {cities.map((city, index) => (
              <Clickable
                className={clsx(
                  styles["city-card"],
                  "relative select-none shrink-0 shadow-xl snap-center"
                )}
                key={index}
              >
                <div className="shrink-0">
                  <Image
                    src={city.image}
                    width={177}
                    height={242}
                    alt="City card"
                  />
                  <div className="bg-black/30 text-white text-center shadow-lg rounded-md py-1 mx-3">
                    {city.name}
                  </div>
                </div>
              </Clickable>
            ))}
          </div>
        </div>
        <div className="flex justify-center my-5">
          <Button className={clsx(styles.button, "px-12 rounded-3xl relative")}>
            <span className="text-white z-10">Explore Marketplace</span>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Testimoni;
