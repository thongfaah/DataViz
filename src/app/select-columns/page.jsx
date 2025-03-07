"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";

const SelectColumnsPage = () => {
  const [files, setFiles] = useState([]); // รายการไฟล์จาก Database
  const [selectedFile, setSelectedFile] = useState(""); // ไฟล์ที่เลือก
  const [data, setData] = useState({ columns: [], rows: [] });
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
  <div className="flex">
    <div className="flex-1 p-8">
     
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
        <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
      )}
    </div>

    {/* Sidebar */}
    <div className={`fixed right-0 top-0 h-full w-64 bg-white shadow-md border-l border-gray-300 transition-transform ${isSidebarOpen? "translate-x-0" : "translate-x-full"}`}>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-4 -left-10 bg-gray-200 p-2 rounded-l-md">
        {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Data</h2>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            className="w-full pl-8 p-2 border rounded"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="mb-4 p-2 border rounded w-full"
          value={selectedFile}
          onChange={handleFileChange}
        >
          <option value="">Select file</option>
          {files.map((file, index) => (
            <option key={index} value={file}>
              {file}
            </option>
          ))}
        </select>
        {selectedFile && (
          <div className="overflow-y-auto max-h-60">
            {data.columns.filter(col => col.toLowerCase().includes(searchTerm.toLowerCase())).map((col, index) => (
              <label key={index} className="block">
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
        )}
      </div>
    </div>
  </div>
);
};

export default SelectColumnsPage;


