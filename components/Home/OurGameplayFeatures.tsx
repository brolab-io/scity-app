import Image from "next/image";

const OurGameplayFeatures: React.FC = () => {
  const lists = [
    {
      icon: "/images/icons/buy-land.svg",
      title: "Buy Land",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      icon: "/images/icons/open-business.svg",
      title: "Open Business",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      icon: "/images/icons/get-profit.svg",
      title: "Get Profit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      icon: "/images/icons/trading-icon.svg",
      title: "Trading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
  ];
  return (
    <section className="bg-black text-white pt-20 pb-48">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold">Our gameplay & Features</h2>
            <p className="text-lg leading-relaxed m-4 text-blueGray-500">
              We believe artists need to be compensated for every sale,not just
              the first one!
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          {lists.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4"
            >
              <div className="px-6">
                <Image
                  src={item.icon}
                  height={57}
                  width={57}
                  quality={100}
                  alt={item.title}
                  className="object-center"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">{item.title}</h5>
                  <p className="mt-1 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGameplayFeatures;
