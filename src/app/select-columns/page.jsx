"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";

const SelectColumnsPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [selectedColumns, setSelectedColumns] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({});
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
  // useEffect(() => {
  //   if (!selectedFile) return;

  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`/api/get-data?file=${selectedFile}`);
  //       const result = await res.json();
  //       if (!res.ok) throw new Error(result.error || "Failed to fetch data");

  //       setData({ columns: result.columns, rows: result.rows });
  //     } catch (error) {
  //       console.error("Fetch Data Error:", error);
  //       alert("❌ โหลดข้อมูลล้มเหลว!");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [selectedFile]);

  const toggleFileVisibility = async (file) => {
    setVisibleColumns((prev) => ({ ...prev, [file]: !prev[file] }));

    if (!data[file]) {
      try {
        const res = await fetch(`/api/get-data?file=${file}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch data");

        setData((prev) => ({ ...prev, [file]: result })); // บันทึกข้อมูลไฟล์
      } catch (error) {
        console.error("Fetch Data Error:", error);
        alert("❌ โหลดข้อมูลล้มเหลว!");
      }
    }
  };

  // ฟังก์ชันเลือกไฟล์
  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.value);
  //   setSelectedColumns([]); // รีเซ็ตคอลัมน์เมื่อเปลี่ยนไฟล์
  // };



  // ฟังก์ชันเปลี่ยนค่าคอลัมน์ที่เลือก
  const toggleColumn = (file, col) => {
    setSelectedColumns((prev) => {
      const newCols = { ...prev };
      newCols[file] = newCols[file]?.includes(col)
        ? newCols[file].filter((c) => c !== col)
        : [...(newCols[file] || []), col];
      return newCols;
    });
  };

  return (
    <div className="flex">
    {/* ตารางแสดงข้อมูล */}
    <div className="flex-1 p-8 ">

      {
      // Loading ? (
      //   <p>Loading...</p>
      // ) : 
      selectedFile ? (
        <table className="w-full border-collapse border border-gray-300">
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
      ) : (
        <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
      )}
    </div>

    {/* Sidebar แสดงรายการไฟล์ */}
    <div className={`fixed top-[9.7rem] h-full right-0  w-64 bg-white shadow-md border-l border-gray-300 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-4 -left-10 bg-gray-200 p-2 rounded-l-md">
        {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      <div className="p-4 overflow-y-auto h-full">
        <h2 className="text-lg font-bold text-[#2B3A67] mb-4">Data</h2>
        {files.map((file, index) => (
          <div key={index} className="mb-2">
            <button onClick={() => { setSelectedFile(file); toggleFileVisibility(file); }} className={`w-full text-left p-2 border rounded ${selectedFile === file ? "bg-gray-200" : ""}`}>
              {file}
            </button>
            {visibleColumns[file] && data[file] && (
              <div className="ml-4 mt-2">
                <h3 className="font-bold text-sm mb-2">Columns</h3>
                {data[file]?.columns.map((col, colIndex) => (
                  <label key={colIndex} className="block">
                    <input
                      type="checkbox"
                      checked={selectedColumns[file]?.includes(col) || false}
                      onChange={() => toggleColumn(file, col)}
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
  </div>
);
};

export default SelectColumnsPage;


