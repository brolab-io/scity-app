import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Modal from "../Common/Modal";
import NFTCard, { CardBasicInfo, CardPriceInfo } from "../Common/NFTCard";

type Props = { title?: string; children?: React.ReactNode };

export type CardReceivedRef = {
  showCard: (metadata: LandNFT) => void;
};

const CardReceived = ({ title }: Props, ref: ForwardedRef<CardReceivedRef>) => {
  const [cardMetaData, setCardMetaData] = useState<LandNFT | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const attributes = useMemo(() => {
    const obj: Record<string, string | number> = {};
    for (const attribute of cardMetaData?.attributes ?? []) {
      obj[attribute.trait_type] = attribute.value;
    }
    return obj;
  }, [cardMetaData]);

  const onClickClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const showCard = useCallback((metadata: LandNFT) => {
    setCardMetaData(metadata);
    setIsModalOpen(true);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      showCard,
    }),
    [showCard]
  );

  return (
    <Modal isOpen={isModalOpen} onClose={onClickClose} className="bg-[#171923]">
      <div className="p-4 w-[300px] select-none">
        <div className="mb-6 text-center">
          <h3 className="text-white text-[21px]">{title}</h3>
        </div>
        {cardMetaData && (
          <NFTCard
            CardHeader={<></>}
            CardFooter={
              <>
                <CardBasicInfo
                  title="Mining Efficiency"
                  value={`${attributes.miningEfficiency}%`}
                />
                <CardPriceInfo title="Mining Power" value={`${attributes.miningPower}`} />
              </>
            }
            metadata={cardMetaData}
          />
        )}
      </div>
    </Modal>
  );
};

export default forwardRef<CardReceivedRef, Props>(CardReceived);
