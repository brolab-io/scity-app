type Props = {
  className?: string;
};

const SvgInfo: React.FC<Props> = ({ className }) => (
  <svg
    width="25"
    className={className}
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.75 16.9208H12.75V12.9277H11.75M12.75 8.93467H12.76M21.75 12.9277C21.75 14.1076 21.5172 15.2759 21.0649 16.3659C20.6126 17.4559 19.9497 18.4464 19.114 19.2806C18.2782 20.1149 17.2861 20.7767 16.1942 21.2282C15.1022 21.6797 13.9319 21.9121 12.75 21.9121C11.5681 21.9121 10.3978 21.6797 9.30585 21.2282C8.21392 20.7767 7.22177 20.1149 6.38604 19.2806C5.55031 18.4464 4.88738 17.4559 4.43508 16.3659C3.98279 15.2759 3.75 14.1076 3.75 12.9277C3.75 10.5449 4.69821 8.25971 6.38604 6.57482C8.07387 4.88992 10.3631 3.94336 12.75 3.94336C15.1369 3.94336 17.4261 4.88992 19.114 6.57482C20.8018 8.25971 21.75 10.5449 21.75 12.9277Z"
      stroke="#BF03DE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgInfo;