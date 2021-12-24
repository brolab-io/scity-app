import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="w-screen h-screen fixed z-50 bg-[#1F0537]/95 transform transition-all duration-200 overflow-hidden">
      <div className="flex justify-center items-center w-full h-full  z-50">
        <Image
          src={"/assets/Loading_Scity.gif"}
          width={150}
          height={150}
          alt="loading-logo"
        />
      </div>
    </div>
  );
}
