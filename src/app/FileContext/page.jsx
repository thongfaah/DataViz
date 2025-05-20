"use client"
import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const useFileContext = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [delimiter, setDelimiter] = useState(",");

  return (
    <FileContext.Provider
      value={{
        fileContent,
        setFileContent,
        fileName,
        setFileName,
        isModalOpen,
        setIsModalOpen,
        delimiter,
        setDelimiter,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
