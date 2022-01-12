type Props = {
  className?: string;
};

const SvgChevronRight: React.FC<Props> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 5L16 12L9 19"
        stroke="#718096"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgChevronRight;
