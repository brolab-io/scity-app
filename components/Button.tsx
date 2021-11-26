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
      disabled={disabled}
      className={
        (disabled
          ? "bg-gray-300 text-black cursor-not-allowed"
          : outline
          ? "border-2 border-primary hover:bg-primary hover:text-white"
          : "bg-primary hover:opacity-90 text-white") +
        " " +
        "flex items-center justify-center font-medium py-2 px-4 rounded transform duration-200" +
        (className ? " " + className : "")
      }
    >
      {isLoading ? (
        <>
          <svg
            fill="none"
            className="w-6 h-6 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
