import BoxItem from "./BoxItem";

type Props = {
  boxes: unknown[];
  openBox: () => void;
};

const BoxList: React.FC<Props> = ({ boxes, openBox }) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:px-6 lg:gap-6 xl:px-8 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {boxes.map((item, index) => (
        <BoxItem item={item} key={index} openBox={openBox} />
      ))}
    </div>
  );
};

export default BoxList;
