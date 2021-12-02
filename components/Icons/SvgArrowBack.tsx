type Props = {
  className?: string;
};

const SvgArrowBack: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="10"
      className={className}
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.2207 14.1449L1.9707 7.8949L8.2207 1.6449"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgArrowBack;
