"use client";
import { useEffect, useState } from "react";
import { useMainData } from '../MainDataContext/page';

export default function TableViewer() {
  const [files, setFiles] = useState([]);
  const { mainData, setMainData, selectedColumn, setSelectedColumn } = useMainData();

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data.data))
      .catch((err) => console.error("Error fetching files", err));
  }, []);

  const handleSelectColumn = (col) => {
    setSelectedColumn(col === selectedColumn ? null : col); // toggle
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-48 bg-[#F5F5F5] p-2 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Tables</h2>
        <ul>
          {files.map((file) => (
            <li
              key={file._id}
              className={`cursor-pointer p-2 rounded-sm text-sm hover:bg-[#e9e7e7] ${
                mainData?._id === file._id ? "bg-[#D9D9D9]" : ""
              }`}
              onClick={() => {
                const columnTypes = detectColumnTypes(file.rows);
                setMainData({ ...file, columnTypes });
                setSelectedColumn(null);
              }}
              
            >
              {file.table_name || "Unnamed Table"}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Table */}
      <div className="w-3/4 p-4 overflow-hidden">
        {mainData ? (
          <>
            <h2 className="text-xl font-semibold mb-4">{mainData.table_name}</h2>

            <div className="overflow-auto max-h-[65vh]">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    {mainData.columns.map((col) => (
                      <th
                        key={col}
                        onClick={() => handleSelectColumn(col)}
                        className={`text-left p-2 border-b border-gray-300 cursor-pointer hover:bg-[#8192c6] ${
                          selectedColumn === col ? "bg-[#2B3A67] text-white" : ""
                        }`}
                        title="คลิกเพื่อเลือกคอลัมน์นี้"
                      >
                        <div className="flex flex-col">
                          <span>{col}</span>
                          <span className="text-xs text-gray-300">
                            {mainData.columnTypes?.[col] || 'Unknown'}
                          </span>
                        </div>

                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mainData.rows.map((row, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      {mainData.columns.map((col) => (
                        <td
                        key={col}
                        className={`p-2 border-b border-gray-200 text-sm ${
                          selectedColumn === col ? 'bg-[#F5F5F5]' : ''
                        }`}
                      >
                          {!row[col] ? "null" : row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-gray-500">เลือกตารางจากด้านซ้ายเพื่อดูรายละเอียด</p>
        )}
      </div>
    </div>
  );
}



function detectColumnTypes(rows, sampleSize = 10) {
  if (!rows || rows.length === 0) return {};

  const columnTypes = {};
  const columns = Object.keys(rows[0]);

  for (const col of columns) {
    const samples = rows
      .map(row => row[col])
      .filter(val => val !== null && val !== undefined && val !== '')
      .slice(0, sampleSize);

    const typeCounts = {
      'Boolean': 0,
      'Whole Number': 0,
      'Decimal Number': 0,
      'Date': 0,
      'Text': 0
    };

    for (const val of samples) {
      const lower = String(val).toLowerCase();

      if (lower === "true" || lower === "false") {
        typeCounts["Boolean"]++;
      } else if (!isNaN(val) && Number.isInteger(Number(val))) {
        typeCounts["Whole Number"]++;
      } else if (!isNaN(val) && !Number.isInteger(Number(val))) {
        typeCounts["Decimal Number"]++;
      } else if (!isNaN(Date.parse(val))) {
        typeCounts["Date"]++;
      } else {
        typeCounts["Text"]++;
      }
    }

    const detected = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
    columnTypes[col] = detected ? detected[0] : "Text";
  }

  return columnTypes;
}
