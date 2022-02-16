import Image from "next/image";

type Props = {
  className?: string;
};

const LoadingWithLogo: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Image
        src="/assets/images/icons/loading-1024x1024.gif"
        alt="loading"
        height={256}
        width={256}
        quality={100}
      />
    </div>
  );
};

export default LoadingWithLogo;
