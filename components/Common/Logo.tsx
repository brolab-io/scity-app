import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link passHref href="/">
      <a className="flex items-center space-x-1 duration-200 transform ">
        <Image
          layout="fixed"
          src="/logo.png"
          height={81}
          width={81}
          alt="logo"
        />
      </a>
    </Link>
  );
};

export default Logo;
