type Props = {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({
  disabled,
  children,
  isLoading,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        (disabled
          ? "bg-gray-300 text-black cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 border-blue-700 hover:border-blue-800  text-white") +
        " " +
        "font-bold py-2 px-3 border-b-4 rounded"
      }
    >
      {isLoading ? (
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
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
