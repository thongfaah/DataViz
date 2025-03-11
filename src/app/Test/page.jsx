"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const Test = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState({});
  const [selectedColumns, setSelectedColumns] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState("table");

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

  const toggleFileVisibility = async (file) => {
    setVisibleColumns((prev) => ({ ...prev, [file]: !prev[file] }));

    if (!data[file]) {
      try {
        const res = await fetch(`/api/get-data?file=${file}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch data");

        setData((prev) => ({ ...prev, [file]: result }));
      } catch (error) {
        console.error("Fetch Data Error:", error);
        alert("❌ โหลดข้อมูลล้มเหลว!");
      }
    }
  };

  const toggleColumn = (file, col) => {
    setSelectedColumns((prev) => {
      const newCols = { ...prev };
      newCols[file] = newCols[file]?.includes(col)
        ? newCols[file].filter((c) => c !== col)
        : [...(newCols[file] || []), col];
      return newCols;
    });
  };

  const chartData = selectedFile && data[selectedFile]?.rows
    ? data[selectedFile].rows.map((row) => {
        let newObj = { name: row[selectedColumns[selectedFile]?.[0]] || "" };
        selectedColumns[selectedFile]?.slice(1).forEach((col) => {
          newObj[col] = Number(row[col]) || 0;
        });
        return newObj;
      })
    : [];

  return (
    <div className="flex">
      <div className="flex-1 p-8 border border-gray-300 w-auto">
        <div className="mb-4 flex gap-4">
          <button
            className={`p-2 border rounded ${viewMode === "table" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setViewMode("table")}
          >
            แสดงเป็นตาราง
          </button>
          <button
            className={`p-2 border rounded ${viewMode === "chart" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setViewMode("chart")}
          >
            กราฟแท่ง
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : selectedFile ? (
          viewMode === "table" ? (
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedColumns[selectedFile]?.slice(1).map((col, index) => (
                  <Bar key={index} dataKey={col} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )
        ) : (
          <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
        )}
      </div>

      <div className={`fixed top-[9.7rem] h-[35.1rem] right-0 w-64 bg-white shadow-md border-l border-gray-300 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-4 -left-10 bg-gray-200 p-2 rounded-l-md">
          {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <div className="p-4 overflow-y-auto h-full">
          <h2 className="text-lg font-bold text-[#2B3A67] mb-4">Data</h2>
          {files.map((file, index) => (
            <div key={index} className="mb-2">
              <button onClick={() => { setSelectedFile(file); toggleFileVisibility(file); }} className={`flex w-full text-left text-sm p-2  ${selectedFile === file ? "bg-gray-100" : ""}`}>
                <svg className="mt-[0.5rem] left-0" width="50" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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

export default Test;


// "use client";
// import React, { useEffect, useState } from "react";
// import { ChevronRight, ChevronLeft, Search } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const Test = () => {
//   const [files, setFiles] = useState([]); 
//   const [selectedFile, setSelectedFile] = useState(""); 
//   const [data, setData] = useState({ columns: [], rows: [] });
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("table"); // "table" หรือ "chart"

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await fetch("/api/list-files");
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.error || "Failed to fetch files");
//         setFiles(result.files);
//       } catch (error) {
//         console.error("Fetch Files Error:", error);
//         alert("❌ โหลดรายการไฟล์ล้มเหลว!");
//       }
//     };
//     fetchFiles();
//   }, []);

//   useEffect(() => {
//     if (!selectedFile) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/get-data?file=${selectedFile}`);
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.error || "Failed to fetch data");

//         setData({ columns: result.columns, rows: result.rows });
//       } catch (error) {
//         console.error("Fetch Data Error:", error);
//         alert("❌ โหลดข้อมูลล้มเหลว!");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedFile]);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.value);
//     setSelectedColumns([]);
//   };

//   const toggleColumn = (col) => {
//     setSelectedColumns((prev) =>
//       prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
//     );
//   };

//   // แปลงข้อมูลเป็นรูปแบบที่ Recharts ใช้ได้
//   const chartData = data.rows.map((row) => {
//     let newObj = {};
//     selectedColumns.forEach((col) => {
//       newObj[col] = isNaN(row[col]) ? 0 : Number(row[col]); // ตรวจสอบค่าตัวเลข
//     });
//     return newObj;
//   }
// );

//   return (
//     <div className="flex">
//       {/* แสดงข้อมูลแบบตารางหรือกราฟ */}
//       <div className="flex-1 p-8 border border-gray-300 w-full">
//         <div className="mb-4 flex gap-4">
//           <button
//             className={`p-2 border rounded ${viewMode === "table" ? "bg-blue-500 text-white" : ""}`}
//             onClick={() => setViewMode("table")}
//           >
//             แสดงเป็นตาราง
//           </button>
//           <button
//             className={`p-2 border rounded ${viewMode === "chart" ? "bg-blue-500 text-white" : ""}`}
//             onClick={() => setViewMode("chart")}
//           >
//             กราฟแท่ง
//           </button>
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : selectedFile ? (
//           viewMode === "table" ? (
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   {selectedColumns.map((col, index) => (
//                     <th key={index} className="border border-gray-300 p-2">
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.rows.map((row, rowIndex) => (
//                   <tr key={rowIndex} className="hover:bg-gray-100">
//                     {selectedColumns.map((col, colIndex) => (
//                       <td key={colIndex} className="border border-gray-300 p-2">
//                         {row[col] || "-"}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={chartData}>
//                 <XAxis dataKey={selectedColumns[0]} />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 {selectedColumns.slice(1).map((col, index) => (
//                   <Bar key={index} dataKey={col} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
//                 ))}
//               </BarChart>
//             </ResponsiveContainer>
//           )
//         ) : (
//           <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
//         )}
//       </div>

//       {/* Sidebar */}
//       <div className={`fixed top-[9.7rem] h-full right-0 w-64 bg-white shadow-md border-l border-gray-300 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
//         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-4 -left-10 bg-gray-200 p-2 rounded-l-md">
//           {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//         <div className="p-4">
//           <h2 className="text-lg font-bold text-[#2B3A67] mb-4">Data</h2>

//           <select className="mb-4 p-2 border rounded w-full" value={selectedFile} onChange={handleFileChange}>
//             <option value="">Select file</option>
//             {files.map((file, index) => (
//               <option key={index} value={file}>
//                 {file}
//               </option>
//             ))}
//           </select>

//           {selectedFile && (
//             <div className="overflow-y-auto max-h-60">
//               {data.columns.filter(col => col.toLowerCase().includes(searchTerm.toLowerCase())).map((col, index) => (
//                 <label key={index} className="block">
//                   <input
//                     type="checkbox"
//                     checked={selectedColumns.includes(col)}
//                     onChange={() => toggleColumn(col)}
//                     className="mr-2"
//                   />
//                   {col}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;
