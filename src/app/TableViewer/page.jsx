// components/TableViewer.jsx
"use client";
import { useEffect, useState } from "react";
import { useMainData } from "../MainDataContext/page";
export default function TableViewer() {
  const [files, setFiles] = useState([]);
  const { mainData, setMainData } = useMainData();

  useEffect(() => {
    fetch("/api/files") // เปลี่ยนตาม path จริงของ API
      .then((res) => res.json())
      .then((data) => setFiles(data.data))
      .catch((err) => console.error("Error fetching files", err));
  }, []);

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
                mainData?._id === file._id ? "bg-[#D9D9D9] " : ""
              }`}
              onClick={() => setMainData(file)}
            >
              {file.table_name || "Unnamed Table"}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
        <div className="w-3/4 p-4 overflow-auto">
        {mainData ? (
            <div>
            <h2 className="text-xl font-semibold mb-4">
                {mainData.table_name}
            </h2>

            {/* Table Display */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 ">
                <thead className="bg-gray-200">
                    <tr>
                    {mainData.columns.map((col) => (
                        <th
                        key={col}
                        className="text-left p-2 border-b border-gray-300"
                        >
                        {col}
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
                            className="p-2 border-b border-gray-200 text-sm"
                        >
                            {row[col] !== undefined && row[col] !== null ? row[col] : "null"}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        ) : (
            <p className="text-gray-500">เลือกตารางจากด้านซ้ายเพื่อดูรายละเอียด</p>
        )}
        </div>

    </div>
  );
}
