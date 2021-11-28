import Image from "next/image";

const Feature = () => {
  return (
    <div className="bg-black text-white" id="feature">
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex w-full justify-end">
          <div className="h-full w-full">
            <Image
              src="/assets/Mask-Group.png"
              alt="Mask Group"
              layout="responsive"
              quality={100}
              height={835}
              width={672}
            />
          </div>
        </div>
        <div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12">
          <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
            Travel With Us To <br /> A Land of Future
          </h3>
          <p className="my-2 text-black-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
