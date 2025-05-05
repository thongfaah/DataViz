"use client"
import { createContext, useContext, useState } from 'react';

const MainDataContext = createContext();

export const MainDataProvider = ({ children }) => {
  const [mainData, setMainData] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null); // ✅ เพิ่ม

  return (
    <MainDataContext.Provider value={{
      mainData,
      setMainData,
      selectedColumn,
      setSelectedColumn
    }}>
      {children}
    </MainDataContext.Provider>
  );
};

export const useMainData = () => useContext(MainDataContext);
