import LoadingIcon from "./LoadingIcon";
import clsx from "clsx";

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  outline?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  disabled,
  children,
  isLoading,
  outline,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        "flex items-center justify-center py-2 px-4 rounded transform duration-500", // Button
        {
          "border-2 border-primary hover:bg-primary hover:text-white": outline, // Outline
        },
        {
          "bg-gradient from-purple-500 to-purple-700 bg-gradient-to-b":
            !outline, // Default
        },
        "disabled:cursor-not-allowed disabled:from-dark-gray disabled:to-dark-gray", // Disabled
        "text-white disabled:text-gray-600", // Text
        className
      )}
    >
      {isLoading ? <LoadingIcon className="w-4 h-4 mr-2" /> : null}
      {children}
    </button>
  );
};

export default Button;
