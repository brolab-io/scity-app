import Image from "next/image";
import Link from "next/link";

type Props = {
  height?: number;
  width?: number;
};

const Logo: React.FC<Props> = ({ height = 100, width = 100 }) => {
  return (
    <Link passHref href="/">
      <a className="flex items-center space-x-1 duration-200 transform">
        <Image
          layout="fixed"
          quality={100}
          priority
          src="/logo.png"
          height={height}
          width={width}
          alt="logo"
        />
      </a>
    </Link>
  );
};

export default Logo;
