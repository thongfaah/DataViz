"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie } from "recharts";
import Moveable from "react-moveable";
import TableView from "../TableView/page";
import PieChartView from "../Piechart/page";
import BarChartView from "../Barchart/page";
import DataViz from "../DataViz/page";

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
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const targetRef = useRef(null);
  const moveableRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.style.width = `${width}px`;
      targetRef.current.style.height = `${height}px`;
    }
  }, [width, height]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
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

  // const generateColors = useMemo(() => {
  //   const colors = {};
  //   return (col) => {
  //     if (!colors[col]) {
  //       colors[col] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  //     }
  //     return colors[col];
  //   };
  // }, []);

  

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

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (targetRef.current && !targetRef.current.contains(e.target)) {
          setIsSelected(false);
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


  return (


   
    <div className=" flex overflow-hidden w-full h-full ">
    
      <div
        ref={targetRef}
        onMouseDown={() => setIsSelected(true)}
        className="relative overflow-hidden  cursor-move"
        style={{ transform: `translate(${posX}px, ${posY}px)`, width: `${width}px`, height: `${height}px` }}
      >
        <div className="p-8 border border-gray-300 w-full h-full shadow-lg cursor-move ">
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

      
        {loading ? (
          <p>Loading...</p>
        ) : selectedFile ? (
          viewMode === "table" ? (
            <TableView selectedFile={selectedFile} selectedColumns={selectedColumns} data={data} />
          ) :  viewMode === "pie" ? (
            <PieChartView pieData={pieData} width={width} height={height} />
            ) :
              (
                <BarChartView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} />
          )
        ) : null
        // (
        //   <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
        // )
        }
         
      </div>
      </div>

      {isSelected && (
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
            const minWidth = 150;
            const minHeight = 100;
            target.style.width = `${Math.max(width, minWidth)}px`;
            target.style.height = `${Math.max(height, minHeight)}px`;
            setWidth(Math.max(width, minWidth));
            setHeight(Math.max(height, minHeight));
          }}
        />
      )}

      
      <div className={`fixed top-[9.7rem] h-[34.1rem] right-0 w-[15rem] bg-white shadow-md border-l border-gray-300 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-md z-10"
        >
          {isSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button> */}
        <button
          className="absolute top-4 right-4  p-2 z-10 item-center rounded  hover:bg-gray-100 "
          onClick={() => setIsSidebarOpen(false)}
        >
          <svg width="20" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5417 17.7083L18.75 12.5L13.5417 7.29163M6.25 17.7083L11.4583 12.5L6.25 7.29163" stroke="#2B3A67" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div className="p-4 overflow-y-auto h-full">
          <h2 className="text-lg font-bold text-[#2B3A67] mb-4">Data</h2>
          <div className="border-t pt-2 pb-3">
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

      {!isSidebarOpen && (
          <button
            className="fixed right-0  p-2 bg-gray-200 hover:bg-gray-300 rounded-l"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronLeft className="w-4 h-4"/>
          </button>
        )}
    </div>
  );
};

export default Test;


