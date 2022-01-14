import styles from "./Connect.module.css";
import clsx from "clsx";
import Link from "next/link";

const EnterApp: React.FC = () => {
  const href = process.env["NEXT_PUBLIC_ENV"] === "production" ? "#" : "/marketplace";
  return (
    <Link passHref href={href}>
      <a
        className={clsx(
          styles["enter-app"],
          "text-sm text-white px-10 py-[10px] rounded-[30px] flex items-center",
          "hover:opacity-80 duration-200",
          "disabled:opacity-60 duration-200",
          "animate-scale relative"
        )}
      >
        <span className="whitespace-nowrap font-medium uppercase text-[16px]">Enter App</span>
      </a>
    </Link>
  );
};

export default EnterApp;
