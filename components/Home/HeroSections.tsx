import Button from "../Button";

const HeroSection: React.FC = () => {
  return (
    <section className="">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div className="pt-32 sm:pt-0">
            <h2 className="font-semibold text-4xl text-blueGray-600">
              Notus NextJS - A beautiful extension for Tailwind CSS.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
              Notus NextJS is Free and Open Source. It does not change any of
              the CSS from{" "}
              <a
                href="https://tailwindcss.com/?ref=creativetim"
                className="text-blueGray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tailwind CSS
              </a>
              . It features multiple HTML elements and it comes with dynamic
              components for ReactJS, Vue and Angular.
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
      <img
        className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
        src="/images/pattern_nextjs.png"
        alt="..."
      />
    </section>
  );
};

export default HeroSection;
