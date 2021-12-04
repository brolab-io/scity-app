import { useCallback, useEffect, useState } from "react";
import SvgCloseIcon from "../Icons/SvgCloseIcon";
import Clickable from "./Clickable";

type Props = {
  title: string;
  message: string;
  type: "success" | "error" | "warning";
};

const AlertModal: React.FC<Props> = ({ title, message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="max-w-md bg-white divide-y divide-gray-300 rounded-lg shadow-lg">
          <div className="relative px-12 py-3 text-center">
            <Clickable onClick={hideModal} className="absolute top-0 bottom-0 right-0 p-4">
              <SvgCloseIcon className="w-5 h-5 text-black fill-current" />
            </Clickable>
            <h4 className="text-xl font-semibold text-green-500">{title}</h4>
          </div>
          <div className="max-w-sm px-12 py-8">
            <p className="text-base text-center text-gray-700">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
