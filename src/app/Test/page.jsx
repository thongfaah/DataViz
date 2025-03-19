"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie } from "recharts";
import Moveable from "react-moveable";

const Test = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState({});
  const [selectedColumns, setSelectedColumns] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0)
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const targetRef = useRef(null);
  const moveableRef = useRef(null);
  

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

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
  };

  const pieData = useMemo(() => {
    if (!selectedFile || !data[selectedFile]?.rows || selectedColumns[selectedFile]?.length !== 2) {
      return [];
    }
  
    return data[selectedFile].rows.map(row => ({
      name: row[selectedColumns[selectedFile][0]] || "",
      value: Number(row[selectedColumns[selectedFile][1]]) || 0,
      fill: generateRandomColor() // ใช้ฟังก์ชันสุ่มสี
    }));
  }, [selectedFile, data, selectedColumns]);

  const generateColors = useMemo(() => {
    const colors = {};
    return (col) => {
      if (!colors[col]) {
        colors[col] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }
      return colors[col];
    };
  }, []);

  

  const chartData = selectedFile && data[selectedFile]?.rows
    ? data[selectedFile].rows.map((row) => {
        let newObj = { name: row[selectedColumns[selectedFile]?.[0]] || "" };
        selectedColumns[selectedFile]?.slice(1).forEach((col) => {
          newObj[col] = Number(row[col]) || 0;
        });
        return newObj;
      })
    : [];

    // const pieData = selectedFile && data[selectedFile]?.rows
    // ? selectedColumns[selectedFile]?.length === 2
    //   ? data[selectedFile].rows.map(row => ({
    //       name: row[selectedColumns[selectedFile][0]] || "",
    //       value: Number(row[selectedColumns[selectedFile][1]]) || 0
    //     }))
    //   : []
    // : [];

    useEffect(() => {
      if (targetRef.current) {
        targetRef.current.style.width = `${width}px`;
        targetRef.current.style.height = `${height}px`;
      }
    }, [width, height]);


  return (



    <div className=" flex ">
    
      <div
        ref={targetRef}
        className="absolute overflow-hidden"
        style={{ transform: `translate(${posX}px, ${posY}px)`, width: `${width}px`, height: `${height}px` }}
      >
        <div className="p-8 border border-gray-300 w-full h-full shadow-lg cursor-move">
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

            <button
            className={`p-2 border rounded ${viewMode === "pie" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setViewMode("pie")}
            >
              แผนภูมิวงกลม
            </button>
          </div>
      
        {/* {loading ? (
          <p>Loading...</p>
        ) : selectedFile ? (
          viewMode === "table" ? (
            <table className="justify-center items-center w-full border-collapse border border-gray-300 text-sm table-fixed">
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
            <div className="flex justify-center items-center">
            <ResponsiveContainer width={width} height={height - 100}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedColumns[selectedFile]?.slice(1).map((col, index) => (
                  <Bar key={index} dataKey={col} fill={generateColors(col)} />
                ))}
              </BarChart>
            </ResponsiveContainer>
            </div>
            
          )
        ) : (
          <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
        )} */}

        {loading ? (
          <p>Loading...</p>
        ) : selectedFile ? (
          viewMode === "table" ? (
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
          ) :  viewMode === "pie" ? (
            pieData.length > 0 ? (
              <div className="flex justify-center items-center">
              <ResponsiveContainer width={width} height={height - 100}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
              </div>
            ) : (
              <p>กรุณาเลือก 2 คอลัมน์ (1 Label + 1 Value) สำหรับแผนภูมิวงกลม</p>
            ) 
            ) : (
              <div className="flex justify-center items-center">
            <ResponsiveContainer width={width} height={height - 100}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedColumns[selectedFile]?.slice(1).map((col, index) => (
                  <Bar key={index} dataKey={col} fill={generateColors(col)} />
                ))}
              </BarChart>
            </ResponsiveContainer>
            </div>
          )
        ) : (
          <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
        )}
        
      {/* </div> */}  
      </div>
      </div>

      <Moveable
        ref={moveableRef}
        target={targetRef.current}
        draggable={true}
        resizable={true}
        keepRatio={false}
        edge={false}
        throttleResize={1}
        onDrag={({ beforeTranslate }) => {
          setPosX(beforeTranslate[0]);
          setPosY(beforeTranslate[1]);
        }}
        onResize={({ target, width, height }) => {
          const minWidth = 150;  // กำหนดขนาดเล็กสุด
          const minHeight = 100;
        
          target.style.width = `${Math.max(width, minWidth)}px`;
          target.style.height = `${Math.max(height, minHeight)}px`;
        
          setWidth(Math.max(width, minWidth));
          setHeight(Math.max(height, minHeight));
        }}
      />

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


