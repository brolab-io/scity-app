import clsx from "clsx";

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={clsx("max-w-screen-xl mx-auto", className)}>{children}</div>;
};

export default Container;
