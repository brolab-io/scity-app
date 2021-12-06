import Image from "next/image";
import Link from "next/link";

type Props = {
  height?: number;
  width?: number;
};

const Logo: React.FC<Props> = ({ height = 72, width = 72 }) => {
  return (
    <Link passHref href="/">
      <a className="flex items-center space-x-1 duration-200 transform">
        <Image layout="fixed" src="/logo.png" height={height} width={width} alt="logo" />
      </a>
    </Link>
  );
};

export default Logo;
