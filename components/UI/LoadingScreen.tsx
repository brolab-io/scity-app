import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="w-screen h-screen fixed z-50 inset-0 bg-[#1F0537] transform transition-all duration-200 overflow-hidden">
      <div className="z-50 flex items-center justify-center w-full h-full">
        <Image src={"/assets/Loading_Scity.gif"} width={150} height={150} alt="loading-logo" />
      </div>
    </div>
  );
}
