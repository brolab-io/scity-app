import Image from "next/image";
import Button from "../UI/Button";

type Props = {
  item: unknown;
  openBox: () => void;
};

const BoxItem: React.FC<Props> = ({ openBox }) => {
  return (
    <div className="p-6 space-y-2 bg-dark rounded-xl">
      <Image width={456} height={426} alt="card" src="/images/icons/box.png" />
      <div className="py-1 mt-4 md:mt-2 lg:mt-1">
        <span className="font-semibold text-white lg:text-lg">
          TREASURE BOX
        </span>
      </div>
      <Button onClick={openBox} className="w-full">
        <span className="font-semibold text-white">Open Box</span>
      </Button>
    </div>
  );
};

export default BoxItem;
