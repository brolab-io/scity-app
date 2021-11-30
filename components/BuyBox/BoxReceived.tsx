import { memo, useCallback } from "react";
import isEqual from "react-fast-compare";
import Image from "next/image";
import Button from "../UI/Button";

type Props = {
  isVisible: boolean;
  close: () => void;
  approve: () => void;
  isApproved: boolean;
  isLoading: boolean;
};

const BoxReceived: React.FC<Props> = ({
  isVisible,
  close,
  isApproved,
  approve,
  isLoading,
}) => {
  const onClick = useCallback(() => {
    if (isApproved) {
      // Buy
      approve();
    } else {
      approve();
    }
  }, [approve, isApproved]);
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-70">
      <div className="p-12 space-y-4 bg-white rounded-xl">
        <div className="text-2xl font-bold text-center">
          You have received a box!
        </div>
        <div className="p-12 rounded-xl w-72 h-72 bg-radial-gradient-purple">
          <Image
            src="/images/icons/box.png"
            height={456}
            width={426}
            alt="Box"
            className="animate-wiggle"
          />
        </div>
        <div className="grid items-center w-full grid-cols-3 space-x-4">
          <Button
            isLoading={isLoading}
            onClick={onClick}
            className="col-span-2"
          >
            <span>{isApproved ? "Open" : "Approve Box"}</span>
          </Button>
          <Button onClick={close} outline className="col-span-1">
            <span className="text-purple-600 ">Close</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(BoxReceived, isEqual);
