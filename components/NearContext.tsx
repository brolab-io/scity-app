import { createContext } from "react";

const NearContext = createContext({});

const NearProvider: React.FC = ({ children }) => {
  return <NearContext.Provider value={{}}>{children}</NearContext.Provider>;
};

export default NearContext;
