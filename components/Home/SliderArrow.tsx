import clsx from "clsx";
import { CustomArrowProps } from "react-slick";
import Clickable from "../UI/Clickable";

const SliderArrow: React.FC<CustomArrowProps> = ({ onClick, children, className }) => {
  return (
    <div className={clsx(className, "z-50 top-1/2 absolute")}>
      <Clickable
        onClick={onClick}
        className="z-50 flex items-center justify-center w-12 h-12 duration-100 transform bg-dark-gray bg-opacity-90 hover:bg-opacity-100 rounded-3xl hover:scale-110"
      >
        {children}
      </Clickable>
    </div>
  );
};

export default SliderArrow;
