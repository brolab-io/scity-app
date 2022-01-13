import styles from "./Connect.module.css";
import clsx from "clsx";

const EnterApp: React.FC = () => {
  return (
    <button
      className={clsx(
        styles["enter-app"],
        "text-sm text-white px-10 py-[10px] rounded-[30px] flex items-center",
        "hover:opacity-80 duration-200",
        "disabled:opacity-60 duration-200",
        "animate-scale relative"
      )}
    >
      <span className="whitespace-nowrap font-medium uppercase text-[16px]">Enter App</span>
    </button>
  );
};

export default EnterApp;
