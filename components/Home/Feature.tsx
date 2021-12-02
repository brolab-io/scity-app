import Image from "next/image";
import Button from "../UI/Button";
import Container from "../UI/Container";

const Feature = () => {
  return (
    <div className="py-12 text-white bg-black md:py-20 lg:py-28 xl:py-40 " id="feature">
      <div className="grid grid-flow-row grid-cols-1 gap-8 sm:grid-flow-col sm:grid-cols-2">
        <div className="flex justify-end w-full">
          <div className="w-full h-full ">
            <Image
              src="/assets/Mask-Group.png"
              alt="Mask Group"
              layout="responsive"
              quality={100}
              className="h-96"
              height={835 / 2}
              width={672 / 2}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full max-w-screen-sm p-8 space-y-8 md:p-12 lg:p-16 xl:p-20">
          <h3 className="text-4xl font-extrabold leading-relaxed lg:text-5xl text-black-600">
            Travel With Us To <br /> A Land of Future
          </h3>
          <p className="my-2 text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
          </p>
          <Button className="px-10 rounded-3xl">
            <span>Join Telegram</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
