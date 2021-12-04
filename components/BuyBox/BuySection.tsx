import { memo, useCallback } from "react";
import isEqual from "react-fast-compare";
import BuySection from "../Common/BuySection";
import Image from "next/image";

type Props = {
  currentQuantity?: number;
  endTime?: number;
  priceInBSC?: string;
  priceInUSD?: string;
  numberOfSlots?: number;
  isProcessing?: boolean;
  onClickBuyNow: () => void;
};

const BuyBoxBuySection: React.FC<Props> = ({
  isProcessing,
  currentQuantity = 0,
  endTime = 0,
  priceInBSC = "0",
  priceInUSD = "0",
  onClickBuyNow,
}) => {
  const ImageSection = useCallback(
    () => (
      <div className="p-10 md:p-16 lg:p-20 xl:p-24 rounded-xl bg-radial-gradient-purple">
        <Image src="/images/icons/box.png" height={456} width={426} alt="Box" />
      </div>
    ),
    []
  );

  const buttonTitle = "Buy now";

  return (
    <BuySection
      ImageSection={ImageSection}
      slotsRemaining={currentQuantity}
      buttonTitle={buttonTitle}
      buyEnabled={!isProcessing}
      isBuying={isProcessing}
      endTime={new Date(endTime * 1000)}
      showEndTime={false}
      name="Treasure Box"
      onClickBuy={onClickBuyNow}
      priceInBSC={priceInBSC}
      priceInUSD={priceInUSD}
      shopRules={`1. You can buy BOX with SCC, and get a CITY CARD randomly after purchase;\n2. The higher rarity box, the higher CITY CARD rare. There are four level of rarity: B - A - R - SR.\n3. The higher CITY CARD rare, the higher Hashrate, meaning the higher income you’ll receive when stake these card`}
    />
  );
};

export default memo(BuyBoxBuySection, isEqual);
