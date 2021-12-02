import Link from "next/link";

type Props = {
  onClick?: React.MouseEventHandler<any>;
  href?: string;
  className?: string;
};

const Clickable: React.FC<Props> = ({ children, onClick, href, className }) => {
  if (href) {
    return (
      <Link passHref href={href}>
        {children}
      </Link>
    );
  }
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={"cursor-pointer" + ((className && " " + className) || "")}
    >
      {children}
    </div>
  );
};

export default Clickable;
