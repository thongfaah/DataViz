import React , { useEffect, useState } from "react";

const TableView = ({ selectedFile, selectedColumns, data, filteredData }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

 useEffect(() => {
    if (data && data[selectedFile]) {
      console.log("✅ [TableView] Data updated:", data[selectedFile]);

      // ✅ ใช้ filteredData ถ้ามีข้อมูลอยู่
      setTableData(data[selectedFile].rows || []);

      // ✅ แสดงเฉพาะ Columns ที่เลือกไว้
      const filteredColumns = selectedColumns[selectedFile]?.filter(col =>
        data[selectedFile].columns.includes(col)
      );

      console.log("📝 [TableView] Filtered Columns:", filteredColumns);

      setColumns(filteredColumns || []);
    }
  }, [selectedFile, JSON.stringify(data), JSON.stringify(selectedColumns)]);
  
  return (
    // <table className="w-full border-collapse border border-gray-300 text-sm table-fixed">
    //   <thead>
    //     <tr className="bg-gray-200">
    //       {selectedColumns[selectedFile]?.map((col, index) => (
    //         <th key={index} className="border border-gray-300 p-2">{col}</th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data[selectedFile]?.rows.map((row, rowIndex) => (
    //       <tr key={rowIndex} className="hover:bg-gray-100">
    //         {selectedColumns[selectedFile]?.map((col, colIndex) => (
    //           <td key={colIndex} className="border border-gray-300 p-2">{row[col] || "-"}</td>
    //         ))}
    //       </tr>
    //     ))}
  
    //   </tbody>
    // </table>

    <table className="w-full border-collapse border border-gray-300 text-sm table-fixed">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="border border-gray-300 p-2">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="border border-gray-300 p-2">
                {row[col] ?? "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  
  );
};

export default TableView;