import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link passHref href="/">
      <a className="flex items-center space-x-1 duration-200 transform ">
        <Image
          layout="fixed"
          src="/logo.svg"
          height={36}
          width={36}
          alt="logo"
        />
        <div className="mt-2 bg-gradient-to-br text-gradient from-white to-gray-300 hover:from-pink hover:to-purple">
          <span className="text-3xl font-medium select-none">SCITY</span>
        </div>
      </a>
    </Link>
  );
};

export default Logo;
