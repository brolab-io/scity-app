import Link from "next/link";

type Props = {
  onClick?: () => void;
  href?: string;
  className?: string;
};

const Clickable: React.FC<Props> = ({ children, onClick, href, className }) => {
  if (href) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={((className && className + " ") || "") + "cursor-pointer"}
    >
      {children}
    </div>
  );
};

export default Clickable;
