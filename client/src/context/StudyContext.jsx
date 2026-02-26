import { createContext, useContext, useState } from "react";

const StudyContext = createContext(null);

export const StudyProvider = ({ children }) => {
  const [currentStudy, setCurrentStudy] = useState(null);

  return (
    <StudyContext.Provider value={{ currentStudy, setCurrentStudy }}>
      {children}
    </StudyContext.Provider>
  );
};

const useStudy = () => {
  const context = useContext(StudyContext);

  if (!context) {
    throw new Error("useStudy must be used inside StudyProvider");
  }

  return context;
};

export { useStudy };