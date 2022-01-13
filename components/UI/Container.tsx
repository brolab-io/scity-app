import clsx from "clsx";

type Props = {
  className?: string;
  id?: string;
};

const Container: React.FC<Props> = ({ children, className, id }) => {
  return (
    <div id={id} className={clsx("max-w-screen-xl mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
