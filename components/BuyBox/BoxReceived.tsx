import { memo } from "react";
import isEqual from "react-fast-compare";
import Image from "next/image";
import Button from "../UI/Button";

type Props = {
  isVisible: boolean;
  close: () => void;
};

const BoxReceived: React.FC<Props> = ({ isVisible, close }) => {
  if (!isVisible) return null;
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
        <div className="flex items-center space-x-4">
          <Button className="flex flex-1">
            <span>Open</span>
          </Button>
          <Button
            onClick={close}
            outline
            className="flex flex-1 hover:text-white"
          >
            <span className="text-purple-600 ">Close</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(BoxReceived, isEqual);
