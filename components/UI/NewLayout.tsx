import { memo } from "react";
import isEqual from "react-fast-compare";
import Container from "./Container";

type Props = {
  title?: string;
  children?: React.ReactNode | Element | Element[];
};

const NewLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="bg-[#171923] min-h-screen">
      <Container className="px-4 py-10 space-y-responsive md:py-12 lg:py-16 md:px-8 xl:px-4">
        {title ? (
          <div className="flex items-center justify-between">
            <h1 className="text-white title">{title}</h1>
          </div>
        ) : null}
        {children}
      </Container>
    </div>
  );
};

export default memo(NewLayout, isEqual);
