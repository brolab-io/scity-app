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
      <div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white md:text-2xl lg:text-3xl xl:text-4xl">
            Buy NFT Land in your favorite city
          </h2>
        </div>
        <div className="py-8 lg:py-10 xl:py-16 2xl:py-20">
          <div className="relative">
            <Slider
              ref={sliderRef}
              {...settings}
              className="flex items-stretch justify-items-stretch"
            >
              {cities.map((city, index) => (
                <Clickable className="relative select-none" key={index}>
                  <Image
                    src="/images/diamon.png"
                    className={clsx(
                      "transform duration-300",
                      index === imageIndex ? "scale-100 opacity-100" : "scale-75 opacity-50"
                    )}
                    width={400}
                    height={400}
                    alt="item"
                  />
                  <div
                    className={clsx(
                      "absolute inset-0 z-30 flex flex-col items-center justify-center space-y-10 transform duration-300",
                      index === imageIndex ? "scale-100 opacity-100" : "scale-75 opacity-50"
                    )}
                  >
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold uppercase lg:text-2xl xl:text-3xl">
                        {city.name}
                      </h3>
                      <span>{city.numberOfSlots} Slots Available</span>
                    </div>
                    <div className="text-center text-white">
                      <span className="font-bold">500SCC</span> <span>$3000</span>
                    </div>
                  </div>
                </Clickable>
              ))}
            </Slider>
            <SliderArrow
              onClick={onPressBack}
              className="left-0 select-none xl:-left-8 2xl:-left-10"
            >
              <SvgArrowBack />
            </SliderArrow>
            <SliderArrow
              onClick={onPressNext}
              className="right-0 select-none xl:-right-8 2xl:-right-10"
            >
              <SvgArrowNext />
            </SliderArrow>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="px-12 rounded-3xl">
            <span className="text-white">Explore Marketplace</span>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Testimoni;
