import React, { useState } from "react";

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

const Testimoni = ({
  listTestimoni = [
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
  ],
}) => {
  const [height, width] = useWindowSize();
  const [imageIndex, setImageIndex] = useState(0);

  const settings: Settings = {
    className: "center w-full",
    centerMode: true,
    infinite: true,
    slidesToShow: width > 432 ? 3 : 1,
    centerPadding: "0px",
    beforeChange: (current, next) => {
      console.log(current);
      setImageIndex(next);
    },
    focusOnSelect: true,
    nextArrow: (
      <SliderArrow>
        <SvgArrowNext />
      </SliderArrow>
    ),
    prevArrow: (
      <SliderArrow>
        <SvgArrowBack />
      </SliderArrow>
    ),
    arrows: true,
  };

  const [sliderRef, setSliderRef] = useState(null);

  // if (!width) return null;
  return (
    <Container>
      <div>
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-white">Buy NFT Land in your favorite city</h2>
        </div>
        <div className="py-20">
          <Slider
            {...settings}
            // arrows={false}
            // ref={setSliderRef}
            className="flex items-stretch justify-items-stretch"
          >
            {listTestimoni.map((testimoni, index) => (
              <div key={index}>
                <Image
                  src="/images/slider-item.png"
                  className={clsx(
                    "transform duration-300",
                    index === imageIndex ? "scale-100 opacity-100" : "scale-75 opacity-50"
                  )}
                  width={400}
                  height={400}
                  alt="item"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex justify-center">
          <Button className="px-12 rounded-3xl">
            <span className="text-white">Explore Marketplace</span>
          </Button>
        </div>
      </div>
    </Container>
  );

  // return (
  //   <div className="flex flex-col w-full bg-black">
  //     <section className="">
  //       <div className="container px-4 mx-auto">
  //         <div className="flex flex-wrap justify-center mb-24 text-center">
  //           <div className="w-full px-4 lg:w-6/12">
  //             <h2 className="text-4xl font-semibold text-white">
  //               Buy NFT Land in your favorite city
  //             </h2>
  //           </div>
  //         </div>
  //       </div>
  //       <Slider
  //         {...settings}
  //         // arrows={false}
  //         // ref={setSliderRef}
  //         className="flex items-stretch justify-items-stretch"
  //       >
  //         {listTestimoni.map((listTestimonis, index) => (
  //           <div className="flex items-stretch px-3" key={index}>
  //             <div className="flex flex-col p-8 transition-all border-2 border-gray-500 rounded-lg hover:border-orange-500">
  //               <div className="flex flex-col items-stretch w-full xl:flex-row xl:items-center">
  //                 <div className="flex order-2 xl:order-1">
  //                   <Image src={listTestimonis.image} height={50} width={50} alt="Icon People" />
  //                   <div className="flex flex-col ml-5 text-left">
  //                     <p className="text-lg text-white capitalize">{listTestimonis.name}</p>
  //                     <p className="text-sm text-white capitalize">
  //                       {listTestimonis.city},{listTestimonis.country}
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-center flex-none order-1 ml-auto xl:order-2">
  //                   <p className="text-sm text-white">{listTestimonis.rating}</p>
  //                   <span className="flex ml-4">{/* <Stars className="w-4 h-4" /> */}</span>
  //                 </div>
  //               </div>
  //               <p className="mt-5 text-left text-white">“{listTestimonis.testimoni}”.</p>
  //             </div>
  //           </div>
  //         ))}
  //       </Slider>
  //       <div className="flex items-center justify-end w-full">
  //         <div className="flex justify-between flex-none w-auto mt-14">
  //           <div
  //             className="flex items-center justify-center mx-4 text-orange-500 transition-all bg-white border border-orange-500 rounded-full cursor-pointer h-14 w-14 hover:bg-orange-500 hover:text-white-500"
  //             // onClick={sliderRef?.slickPrev}
  //           >
  //             {/* <ArrowBack className="w-6 h-6 " /> */}
  //           </div>
  //           <div
  //             className="flex items-center justify-center text-orange-500 transition-all bg-white border border-orange-500 rounded-full cursor-pointer h-14 w-14 hover:bg-orange-500 hover:text-white-500"
  //             // onClick={sliderRef?.slickNext}
  //           >
  //             {/* <ArrowNext className="w-6 h-6" /> */}
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );
};

export default Testimoni;
