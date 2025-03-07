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
    // <div className="p-8 border-2 border-black">
    //   <h1 className="text-2xl font-bold text-[#2B3A67] mb-4">
    //     Data
    //   </h1>

    //   {/* Dropdown เลือกไฟล์ */}
    //   <select
    //     className="mb-4 p-2 border rounded"
    //     value={selectedFile}
    //     onChange={handleFileChange}
    //   >
    //     <option value="">
    //       {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d ="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#2B3A67"/>
    //       </svg> */}
    //       Select file
    //     </option>
    //     {files.map((file, index) => (
    //       <option key={index} value={file}>
    //         {file}
    //       </option>
    //     ))}
    //   </select>

    //   {/* แสดง Checkbox ให้เลือกคอลัมน์ */}
    //   {selectedFile && (
    //     <>
    //       <h2 className="text-xl font-semibold mt-4">เลือกคอลัมน์:</h2>
    //       <div className="mb-4">
    //         {data.columns.map((col, index) => (
    //           <label key={index} className="mr-4">
    //             <input
    //               type="checkbox"
    //               checked={selectedColumns.includes(col)}
    //               onChange={() => toggleColumn(col)}
    //               className="mr-2"
    //             />
    //             {col}
    //           </label>
    //         ))}
    //       </div>
    //     </>
    //   )}

    //   {/* แสดงตารางเฉพาะคอลัมน์ที่เลือก */}
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : selectedFile ? (
    //     <table className="w-full border-collapse border border-gray-300">
    //       <thead>
    //         <tr className="bg-gray-200">
    //           {selectedColumns.map((col, index) => (
    //             <th key={index} className="border border-gray-300 p-2">
    //               {col}
    //             </th>
    //           ))}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.rows.map((row, rowIndex) => (
    //           <tr key={rowIndex} className="hover:bg-gray-100">
    //             {selectedColumns.map((col, colIndex) => (
    //               <td key={colIndex} className="border border-gray-300 p-2">
    //                 {row[col] || "-"}
    //               </td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>🔹 กรุณาเลือกไฟล์เพื่อดูข้อมูล</p>
    //   )}
    // </div>

    <div className="flex ">
      <div className=" absolute flex-1 p-8 border border-gray-300 w-[20rem] h-auto">
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
          // ""
        )}
      </div>

      {/* show data*/}
      <div className={` fixed mt-[0.01rem] right-0 h-[34.5rem]  w-64 bg-white shadow-md border-l border-gray-300 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-4 -left-10 bg-gray-200 p-2 rounded-l-md">
          {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <div className="p-4 ">
          <h2 className="text-lg font-bold text-[#2B3A67] mb-4">Data</h2>
          {/* <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              className="w-full pl-8 p-2 border rounded"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
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


