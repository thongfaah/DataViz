"use client";
import React, { useEffect, useState } from "react";

const SelectColumnsPage = () => {
  const [files, setFiles] = useState([]); // รายการไฟล์จาก Database
  const [selectedFile, setSelectedFile] = useState(""); // ไฟล์ที่เลือก
  const [data, setData] = useState({ columns: [], rows: [] });
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  // ดึงรายการไฟล์ทั้งหมดจาก Database
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("/api/list-files");
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch files");
        setFiles(result.files);
      } catch (error) {
        console.error("Fetch Files Error:", error);
        alert("❌ โหลดรายการไฟล์ล้มเหลว!");
      }
    };
    fetchFiles();
  }, []);

  // โหลดข้อมูลจากไฟล์ที่เลือก
  useEffect(() => {
    if (!selectedFile) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/get-data?file=${selectedFile}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch data");

        setData({ columns: result.columns, rows: result.rows });
      } catch (error) {
        console.error("Fetch Data Error:", error);
        alert("❌ โหลดข้อมูลล้มเหลว!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFile]);

  // ฟังก์ชันเลือกไฟล์
  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
    setSelectedColumns([]); // รีเซ็ตคอลัมน์เมื่อเปลี่ยนไฟล์
  };

  // ฟังก์ชันเปลี่ยนค่าคอลัมน์ที่เลือก
  const toggleColumn = (col) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#2B3A67] mb-4">
        📊 เลือกไฟล์และคอลัมน์ที่ต้องการแสดง
      </h1>

      {/* Dropdown เลือกไฟล์ */}
      <select
        className="mb-4 p-2 border rounded"
        value={selectedFile}
        onChange={handleFileChange}
      >
        <option value="">🔍 เลือกไฟล์...</option>
        {files.map((file, index) => (
          <option key={index} value={file}>
            {file}
          </option>
        ))}
      </select>

      {/* แสดง Checkbox ให้เลือกคอลัมน์ */}
      {selectedFile && (
        <>
          <h2 className="text-xl font-semibold mt-4">เลือกคอลัมน์:</h2>
          <div className="mb-4">
            {data.columns.map((col, index) => (
              <label key={index} className="mr-4">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => toggleColumn(col)}
                  className="mr-2"
                />
                {col}
              </label>
            ))}
          </div>
        </>
      )}

      {/* แสดงตารางเฉพาะคอลัมน์ที่เลือก */}
      {loading ? (
        <p>Loading...</p>
      ) : selectedFile ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {selectedColumns.map((col, index) => (
                <th key={index} className="border border-gray-300 p-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {selectedColumns.map((col, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-2">
                    {row[col] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>🔹 กรุณาเลือกไฟล์เพื่อดูข้อมูล</p>
      )}
    </div>
  );
};

export default SelectColumnsPage;


