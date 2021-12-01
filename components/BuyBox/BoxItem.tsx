import Image from "next/image";
import Button from "../UI/Button";

type Props = {
  item: unknown;
  openBox: () => void;
  isApproved?: boolean;
  approve: () => void;
};

const BoxItem: React.FC<Props> = ({ openBox, isApproved, approve }) => {
  return (
    <div className="p-6 space-y-2 bg-dark rounded-xl">
      <Image width={456} height={426} alt="card" src="/images/icons/box.png" />
      <div className="py-1 mt-4 md:mt-2 lg:mt-1">
        <span className="font-semibold text-white lg:text-lg">
          TREASURE BOX
        </span>
      </div>
      <Button onClick={isApproved ? openBox : approve} className="w-full">
        <span>{isApproved ? "Open" : "Approve Box"}</span>
      </Button>
    </div>
  );
};

export default BoxItem;
