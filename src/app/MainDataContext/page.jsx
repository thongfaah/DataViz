// context/MainDataContext.jsx
"use client"
import { createContext, useContext, useState } from 'react';

const MainDataContext = createContext();

export const MainDataProvider = ({ children }) => {
  const [mainData, setMainData] = useState(null); // ตัวเก็บข้อมูลตารางหลักที่แสดง

  return (
    <MainDataContext.Provider value={{ mainData, setMainData }}>
      {children}
    </MainDataContext.Provider>
  );
};

export const useMainData = () => useContext(MainDataContext);
