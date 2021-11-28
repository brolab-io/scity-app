import Slider from "react-slick";

const BuyNFTLandSlider: React.FC<{}> = () => {
  const slideData = [
    {
      icon: "/images/icons/facebook.svg",
    },
    {
      icon: "/images/icons/twitter.svg",
    },
    {
      icon: "/images/icons/google.svg",
    },
    {
      icon: "/images/icons/twitch.svg",
    },
    {
      icon: "/images/icons/twitch.svg",
    },
    {
      icon: "/images/icons/twitch.svg",
    },
    {
      icon: "/images/icons/twitch.svg",
    },
    {
      icon: "/images/icons/twitch.svg",
    },
    {
      icon: "/images/icons/twitch.svg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <section className="pt-20 pb-48">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold">
              Buy NFT Land in your favorite city
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <Slider
            {...settings}
            className="flex items-stretch justify-items-stretch"
          >
            {slideData.map((item, index) => (
              <div className="px-3 flex items-stretch" key={index}>
                <p className="mt-5 text-left">{index}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BuyNFTLandSlider;
