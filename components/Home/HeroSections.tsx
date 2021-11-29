import Button from "../UI/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="">
      <div className="container bg-black text-white mx-auto items-center flex flex-wrap">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div className="pt-32 sm:pt-0">
            <h2 className="font-semibold text-4xl text-blueGray-600">SCity</h2>
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
              The new world is coming
            </p>
            <div className="mt-12">
              <Button outline className="text-white">
                Explore
              </Button>
              <Button className="text-white">
                <span>Buy SCC</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
