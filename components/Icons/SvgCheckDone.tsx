type Props = {
  className?: string;
};

const SvgCheckDone: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="51"
      height="45"
      viewBox="0 0 51 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_231_34)">
        <path
          d="M42.1039 7.05176L19.2468 29.9089L8.85718 19.5193"
          stroke="#FFAD02"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_231_34"
          x="-0.142822"
          y="0.0517578"
          width="55.2468"
          height="44.8569"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_231_34" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_231_34"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SvgCheckDone;
