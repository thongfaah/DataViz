
"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

const SidebarData = ({
  files,
  data,
  selectedFile,
  selectedColumns,
  visibleColumns,
  setSelectedFile,
  setIsSidebarOpen,
  toggleFileVisibility,
  toggleColumn,
  isSidebarOpen,
}) => {
  

  return (
    <div>
      <aside
        className={`fixed top-[10rem] h-[32.3rem] right-0 w-[15rem] bg-white border-l border-gray-300 transition-transform z-[20] ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2 z-10 item-center rounded hover:bg-gray-100"
          onClick={() => setIsSidebarOpen(false)}
        >
          <svg
            width="20"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5417 17.7083L18.75 12.5L13.5417 7.29163M6.25 17.7083L11.4583 12.5L6.25 7.29163"
              stroke="#2B3A67"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="p-4 overflow-y-auto h-full">
          <h2 className="text-lg font-bold text-[#2B3A67] mb-4">Data</h2>
          <div className="border-t pt-2 pb-3">
            {files.map((file, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => {
                    // setSelectedFile(file);
                    toggleFileVisibility(file.table_name);
                  }}

                  // className={`flex w-full text-left text-sm p-2 ${
                  //   selectedFile === file ? "bg-gray-100" : ""
                  // }`}
                  className={`flex w-full text-left text-sm p-2 ${
                    visibleColumns[file.table_name] ? "bg-gray-100" : ""
                  }`}
                >
                  <svg
                    className="mt-[0.5rem] left-0"
                    width="50"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.75 4.125L5.5 6.875L8.25 4.125"
                      stroke="#1E1E1E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {file.table_name}
                </button>
                {visibleColumns[file.table_name] && data[file.table_name] && (
                  <div className="ml-4 mt-2">
                    <h3 className="font-bold text-sm mb-2">Columns</h3>
                    {data[file.table_name]?.columns.map((col, colIndex) => (
                      <label key={colIndex} className="block">
                        <input
                          type="checkbox"
                          checked={selectedColumns[file.table_name]?.includes(col) || false}
                          onChange={() => {
                              setSelectedFile(file.table_name);
                             toggleColumn(file.table_name, col)
                            }}
                          className="mr-2"
                        />
                        {col}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {!isSidebarOpen && (
        <button
          className="fixed top-[10rem] right-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-l"
          onClick={() => setIsSidebarOpen(true)}
        >
          {/* <ChevronLeft className="w-4 h-4" /> */}
          <span className="text-sm font-semibold tracking-widest text-[#2B3A67]">Data</span>
        </button>
      )}
    </div>
  );
};

export default SidebarData;





