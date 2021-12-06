type Props = {
  className?: string;
};

const SvgIconRocket: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5_10640)">
        <path
          d="M15.836 15.6068L17.1144 13.7212C19.9665 9.51426 19.5996 5.94575 19.3212 4.63746C19.2917 4.49557 19.1901 4.37298 19.0449 4.30031C18.8988 4.22785 18.7236 4.2137 18.5636 4.26113C17.0807 4.70088 13.2256 6.19479 10.3709 10.4056L9.09219 12.2917L8.52421 12.3252C7.429 12.3905 6.44274 12.9152 5.89344 13.7255L4.36763 15.9761C4.27727 16.1094 4.2801 16.2751 4.37503 16.4065C4.47084 16.5377 4.64343 16.613 4.8241 16.6025L6.66326 16.5022C7.17946 16.4745 7.69379 16.5764 8.14201 16.7968L9.11867 17.277L8.37925 18.3676C8.24322 18.5683 8.32384 18.8245 8.55889 18.9401L9.34089 19.3246C9.57594 19.4401 9.87679 19.3715 10.0128 19.1708L10.7522 18.0802L11.7283 18.5601C12.1766 18.7805 12.5386 19.1082 12.7681 19.5045L13.5849 20.91C13.6645 21.0485 13.8274 21.1381 14.0087 21.1432C14.1898 21.1475 14.3597 21.0667 14.4501 20.9334L15.9759 18.6828C16.5246 17.8735 16.5645 16.8835 16.0845 16.0424L15.836 15.6068ZM14.4674 10.9948C13.6563 10.596 13.3776 9.71179 13.8459 9.02098C14.3146 8.3297 15.3528 8.09361 16.1639 8.49244C16.9745 8.89101 17.2535 9.77473 16.7849 10.466C16.3166 11.1568 15.2781 11.3934 14.4674 10.9948Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_10640">
          <rect
            width="19.4262"
            height="17.9363"
            rx="8.96815"
            transform="matrix(0.897394 0.44123 -0.561149 0.827715 10.2988 0)"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgIconRocket;
