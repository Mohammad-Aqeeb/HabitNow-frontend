import { createContext, useContext, useState } from "react";

const context = createContext();

export const contextProvider = ({ children }) => {
  const [isRatePage, setIsRatePage] = useState(false);

  return (
    <contextProvider.Provider value={{ isRatePage, setIsRatePage }}>
      {children}
    </contextProvider.Provider>
  );
};

export const useTaskContext = () => useContext(context);