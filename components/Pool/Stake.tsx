import Image from "next/image";

const PoolStake = () => {
  return (
    <div className="bg-[#1A202C] p-responsive rounded-[24px] space-y-3 lg:space-y-6">
      <div className="grid grid-cols-2 gap-responsive">
        <div className="bg-[#2D3748] p-10 rounded-[16px] flex flex-col items-center space-y-6 aspect-[242/282] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:brightness-75">
            <div className="bg-[#E630EF] h-[63px] w-[63px] rounded-full bg-opacity-10 flex items-center justify-center">
              <Image src="/assets/images/icons/plus.svg" alt="Plus" height={24} width={24} />
            </div>
            <span className="text-[16px] text-white font-medium">Add Land</span>
          </div>
        </div>
        <div className="bg-[#2D3748] p-10 rounded-[16px] flex flex-col items-center space-y-6 aspect-[242/282] relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:brightness-75">
            <div className="bg-[#E630EF] h-[63px] w-[63px] rounded-full bg-opacity-10 flex items-center justify-center">
              <Image src="/assets/images/icons/plus.svg" alt="Plus" height={24} width={24} />
            </div>
            <span className="text-[16px] text-white font-medium">Add Company</span>
          </div>
        </div>
      </div>
      <button className="w-full rounded button button-magenta button-rounded">
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">Stake</span>
      </button>
    </div>
  );
};

export default PoolStake;
