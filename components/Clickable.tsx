import Link from "next/link";

type Props = {
  onClick?: () => void;
  href?: string;
};

const Clickable: React.FC<Props> = ({ children, onClick, href }) => {
  if (href) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <div role="presentation" onClick={onClick} className="cursor-ponter">
      {children}
    </div>
  );
};

export default Clickable;
