import Image from "next/image";

const PoolInfo = () => {
  return (
    <div className="bg-[#1A202C] p-responsive rounded-[24px] space-y-responsive">
      <div className="bg-[#2D3748] p-responsive rounded-[16px] flex flex-col items-center space-y-2 lg:space-y-5">
        <div>
          <span className="font-medium text-white text-[24px]">Hospital Pool</span>
        </div>
        <div className="flex items-center space-x-5">
          <Image quality={100} src="/assets/images/scc.png" alt="SCC" height={32} width={32} />
          <span className="text-[32px] font-semibold text-white">1,000,000</span>
        </div>
        <div>
          <span className="text-[#A0AEC0]">~ $200,566</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-responsive lg:grid-cols-3">
        <div className="bg-[#2D3748] rounded-[16px] p-5 space-y-4 relative">
          <div className="absolute top-5 right-5">
            <button className="rounded-xl button button-magenta py-2 px-5">
              <span className="text-[12px] md:text-[13px] lg:text-[14px]">Harvest</span>
            </button>
          </div>
          <span className="text-[#A0AEC0] text-[16px]">SCC</span>
          <div className="flex items-center space-x-3">
            <Image quality={100} src="/assets/images/scc.png" alt="SCC" height={32} width={32} />
            <span className="font-semibold text-[20px] text-white">605.250</span>
            <span className="text-[#A0AEC0]"> ~ $200.566</span>
          </div>
        </div>
        <div className="bg-[#2D3748] rounded-[16px] p-5 space-y-4">
          <span className="text-[#A0AEC0] text-[16px]">APY</span>
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[20px] text-white">987.68%</span>
          </div>
        </div>
        <div className="bg-[#2D3748] rounded-[16px] p-5 space-y-4">
          <span className="text-[#A0AEC0] text-[16px]">Total Power Staked</span>
          <div className="flex items-center space-x-3">
            <Image quality={100} src="/assets/images/scc.png" alt="SCC" height={32} width={32} />
            <span className="font-semibold text-[20px] text-white">605.250</span>
            <span className="text-[#A0AEC0]"> ~ $200.566</span>
          </div>
        </div>
        <div className="bg-[#2D3748] rounded-[16px] p-5 space-y-4">
          <span className="text-[#A0AEC0] text-[16px]">Harvest Lockup</span>
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[20px] text-white">12 hours</span>
          </div>
        </div>
        <div className="bg-[#2D3748] rounded-[16px] p-5 space-y-4">
          <span className="text-[#A0AEC0] text-[16px]">Harvest Fee</span>
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[20px] text-white">5%</span>
          </div>
        </div>
        <div className="bg-[#2D3748] rounded-[16px] p-5 space-y-4">
          <span className="text-[#A0AEC0] text-[16px]">1000 Mining Power/24h Get</span>
          <div className="flex items-center space-x-3">
            <Image quality={100} src="/assets/images/scc.png" alt="SCC" height={32} width={32} />
            <span className="font-semibold text-[20px] text-white">605.250</span>
            <span className="text-[#A0AEC0]"> ~ $200.566</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolInfo;
