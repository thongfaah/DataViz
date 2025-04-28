import React from "react";

const TableView = ({ selectedFile, selectedColumns, data }) => {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm table-fixed">
      <thead>
        <tr className="bg-gray-200">
          {selectedColumns[selectedFile]?.map((col, index) => (
            <th key={index} className="border border-gray-300 p-2">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data[selectedFile]?.rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {selectedColumns[selectedFile]?.map((col, colIndex) => (
              <td key={colIndex} className="border border-gray-300 p-2">{row[col] || "-"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;