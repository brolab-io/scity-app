type Props = {
  className?: string;
};

const SvgArrowNext: React.FC<Props> = ({ className }) => {
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
        d="M1.7793 14.1449L8.0293 7.8949L1.7793 1.6449"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgArrowNext;
