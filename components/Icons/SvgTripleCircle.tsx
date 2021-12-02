type Props = {
  className?: string;
};

const SvgTripleCircle: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="86"
      height="20"
      viewBox="0 0 86 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M86 10C86 4.47715 81.5228 0 76 0C70.4772 0 66 4.47715 66 10C66 15.5228 70.4772 20 76 20C81.5228 20 86 15.5228 86 10Z"
        fill="#A548E2"
      />
      <path
        d="M12 11C12 7.68629 9.31371 5 6 5C2.68629 5 0 7.68629 0 11C0 14.3137 2.68629 17 6 17C9.31371 17 12 14.3137 12 11Z"
        fill="#A548E2"
      />
      <path
        d="M45 11C45 7.68629 42.3137 5 39 5C35.6863 5 33 7.68629 33 11C33 14.3137 35.6863 17 39 17C42.3137 17 45 14.3137 45 11Z"
        fill="#A548E2"
      />
    </svg>
  );
};

export default SvgTripleCircle;
