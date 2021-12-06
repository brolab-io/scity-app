import Image from "next/image";
import Container from "../UI/Container";

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
    <section className="px-4 py-20 text-white bg-black">
      <Container>
        <div className="flex flex-wrap justify-center mb-24 text-center">
          <div className="w-full px-4 lg:w-6/12">
            <h2 className="text-4xl font-semibold">Our gameplay & Features</h2>
            <p className="m-4 text-lg leading-relaxed text-blueGray-500">
              We believe artists need to be compensated for every sale,not just the first one!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 font-light sm:grid-cols-2 lg:grid-cols-4">
          {lists.map((item, index) => (
            <div key={index} className="w-full p-8 bg-dark-gray rounded-3xl">
              <div className="text-center">
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
      </Container>
    </section>
  );
};

export default OurGameplayFeatures;
