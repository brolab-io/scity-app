import CompanyItem from "./CompanyItem";

type Props = {
  companies: unknown[];
};

const CompanyList: React.FC<Props> = ({ companies }) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:px-6 lg:gap-6 xl:px-8 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {companies.map((_, index) => (
        <CompanyItem key={index} />
      ))}
    </div>
  );
};

export default CompanyList;
