import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import SvgCloseIcon from "../Icons/SvgCloseIcon";
import Clickable from "../UI/Clickable";

type Props = {
  error: null | any;
  buyedTransactionHash?: string;
};

const AlertModal: React.FC<Props> = ({ error, buyedTransactionHash }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (buyedTransactionHash) {
      setType("success");
      setTitle("Success");
      setMessage("You have successfully purchased the private box.");
      setIsVisible(true);
    }
  }, [buyedTransactionHash]);

  useEffect(() => {
    if (error) {
      setType("error");
      setTitle("Failure");
      setMessage("Something went wrong, please try again later.");
      setIsVisible(true);
    }
  }, [error]);

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
            <h4
              className={clsx(
                "text-xl font-semibold",
                type === "error" ? "text-red-500" : "text-green-500"
              )}
            >
              {title}
            </h4>
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
