import BoxItem from "./BoxItem";

type Props = {
  boxes: unknown[];
  openBox: () => void;
  isApproved: boolean;
  approve: () => void;
};

const BoxList: React.FC<Props> = ({ boxes, openBox, approve, isApproved }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-6 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {boxes.map((item, index) => (
        <BoxItem
          item={item}
          key={index}
          isApproved={isApproved}
          approve={approve}
          openBox={openBox}
        />
      ))}
    </div>
  );
};

export default BoxList;
