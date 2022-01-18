import { memo } from "react";
import isEqual from "react-fast-compare";
import ConnectWalletBlock from "../Common/ConnectWalletBlock";
import Container from "./Container";

type Props = {
  title?: string;
  children?: React.ReactNode | Element | Element[];
};

const NewLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="bg-[#171923] min-h-screen">
      <Container className="px-4 md:px-8 xl:px-4">
        <div className="flex items-center justify-between border-b border-[#1F2530] py-4">
          {title ? (
            <div className="flex items-center justify-between">
              <h1 className="text-white title">{title}</h1>
            </div>
          ) : null}
          <ConnectWalletBlock />
        </div>
        <div className="py-4 space-y-2 lg:py-6 lg:space-y-6">{children}</div>
      </Container>
    </div>
  );
};

export default memo(NewLayout, isEqual);
