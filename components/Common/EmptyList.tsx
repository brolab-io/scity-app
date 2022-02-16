type Props = {
  className?: string;
  message?: string;
};

const EmptyList: React.FC<Props> = ({ className, message }) => {
  return (
    <div className={className}>
      <div className="text-white">{message}</div>
    </div>
  );
};

export default EmptyList;
