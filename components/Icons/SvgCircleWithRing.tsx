type Props = {
  className?: string;
};

const SvgCircleWithRing: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M65.6839 38.9999C65.6839 24.2626 53.7369 12.3157 38.9996 12.3157C24.2624 12.3157 12.3154 24.2626 12.3154 38.9999C12.3154 53.7372 24.2624 65.6841 38.9996 65.6841C53.7369 65.6841 65.6839 53.7372 65.6839 38.9999Z"
        fill="url(#paint0_linear_10_780)"
      />
      <path
        d="M39 0.249998C60.401 0.249997 77.75 17.599 77.75 39C77.75 60.401 60.401 77.75 39 77.75C17.599 77.75 0.249999 60.401 0.249998 39C0.249997 17.599 17.599 0.249999 39 0.249998Z"
        stroke="#A548E2"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10_780"
          x1="12.3154"
          y1="38.9999"
          x2="65.6839"
          y2="38.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#833EF1" />
          <stop offset="1" stopColor="#491CB5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgCircleWithRing;
