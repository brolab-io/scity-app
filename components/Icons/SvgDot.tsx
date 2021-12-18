type Props = {
  className?: string;
};

const SvgDot: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="6"
      className={className}
      height="7"
      viewBox="0 0 6 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3.5" r="3" fill="white" />{" "}
    </svg>
  );
};

export default SvgDot;
