"use client"

import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
import DashNav from "../dash-nav/page";
import Sidebar from "../Sidebar/page";
import CanvasArea from "../CanvasArea/page";
import SidebarData from "../Sidebar-data/page";
import { createPortal } from "react-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const Toolbar = ({ activePanel, setActivePanel, pages, setPages,
  currentPage, setCurrentPage, viewMode, zoomLevel, setZoomLevel, selectedFile, setSelectedFile, showGrid, isLocked,
  handleTextChange,
  startDragging,
  handleDelete, canvasRef, report, selectedChartId,reportName, setReportName }) => {

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, index: null });
  

     // เพิ่มหน้ากระดาษใหม่
     const addPage = () => {
      setPages(prev => [...prev, []]); // เพิ่มหน้าใหม่เป็น array ว่าง
      setCurrentPage(pages.length); 
    };

    const deletePage = (index) => {
      if (pages.length === 1) return; // กันลบหน้าสุดท้าย
      const newPages = pages.filter((_, i) => i !== index);
      setPages(newPages);
      if (currentPage === index) {
        setCurrentPage(Math.max(0, index - 1));
      } else if (currentPage > index) {
        setCurrentPage((prev) => prev - 1);
      }
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Delete") {
          deletePage(currentPage);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [currentPage, pages]);

    const handleRightClick = (e, index) => {
      e.preventDefault();
      setContextMenu({ visible: true, x: e.pageX, y: e.pageY, index });
    };

    useEffect(() => {
      const handleClick = () => {
        if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
      };
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }, [contextMenu]);
    

  // const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2)); // เพิ่มซูมสูงสุดที่ 200%
  };
  
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.1)); // ลดซูมต่ำสุดที่ 10%
  };

  const handleSelectChange = (e) => {
    setZoomLevel(parseFloat(e.target.value));
  };

  const [selectedColumns, setSelectedColumns] = useState({});
  const noColumnsSelected = !selectedColumns;
  
  const [tablePosition, setTablePosition] = useState({ x: 0, y: 40 });

  const handleDropdownClick = async (item) => {
    if (item === "Save") {
      try {
        // ✅ เก็บข้อมูลหน้าปัจจุบัน
        const reportData = {
          title: report.title,
          content: pages,
        };
  
        // ✅ บันทึกลง LocalStorage
        localStorage.setItem(`report-${report._id}`, JSON.stringify(reportData));
  
        alert("✅ Saved successfully!");
      } catch (error) {
        console.error("❌ Save error:", error);
        alert("❌ Failed to save.");
      }
    }
  };

  const handleExportJPEG = async () => {
    const canvasElement = canvasRef?.current;
    if (!canvasElement) {
      alert("ไม่พบ canvas-area");
      return;
    }
  
    try {
      await new Promise((res) => setTimeout(res, 500));
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: true,
      });
  
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `canvas-${Date.now()}.jpeg`;
      link.click();
    } catch (err) {
      alert("❌ Export JPEG ผิดพลาด: " + err.message);
      console.error("📛 JPEG Export Error:", err);
    }
  };

  const handleExportPDF = async () => {
    const canvasElement = canvasRef?.current;
    if (!canvasElement) {
      alert("ไม่พบ canvas-area");
      return;
    }
  
    try {
      await new Promise((res) => setTimeout(res, 300)); // รอ DOM render
  
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: true,
        scale: 2,
      });
  
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("landscape", "pt", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };
  
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
  
      const pdfW = imgProps.width * ratio;
      const pdfH = imgProps.height * ratio;
  
      const marginX = (pdfWidth - pdfW) / 2;
      const marginY = (pdfHeight - pdfH) / 2;
  
      pdf.addImage(image, "JPEG", marginX, marginY, pdfW, pdfH);
      pdf.save(`canvas-${Date.now()}.pdf`);
    } catch (err) {
      alert("❌ Export PDF ผิดพลาด: " + err.message);
      console.error(err);
    }
  };
  
  
  const handleExportExcel = () => {
    if (!selectedChartId) {
      alert("❌ กรุณาเลือกตารางก่อนการ Export");
      return;
    }
  
    console.log("✅ Selected Chart ID:", selectedChartId);
    console.log("✅ Pages Data:", pages);
  
    const selectedItem = pages[currentPage].find(item => item.id === selectedChartId);
  
    if (!selectedItem) {
      console.error("❌ ไม่พบไอเท็มที่ตรงกับ ID ในหน้า:", selectedChartId);
      alert("❌ ไม่พบไอเท็มที่ต้องการ Export");
      return;
    }
  
    console.log("✅ พบไอเท็มที่ตรงกับ ID:", selectedItem);
  
    // ✅ ตรวจสอบว่า chartData อยู่หรือไม่
    if (!selectedItem.chartData) {
      console.error("❌ chartData is missing from selectedItem:", selectedItem);
      alert("❌ ไม่พบข้อมูลในตารางสำหรับ Export");
      return;
    }
  
    if (!Array.isArray(selectedItem.chartData) || selectedItem.chartData.length === 0) {
      console.error("❌ chartData is empty or not an array:", selectedItem.chartData);
      alert("❌ ข้อมูลในตารางว่าง ไม่สามารถ Export ได้");
      return;
    }
  
    try {
      console.log("📌 Data ที่จะ Export:", selectedItem.chartData);
      const worksheet = XLSX.utils.json_to_sheet(selectedItem.chartData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `export-${Date.now()}.xlsx`);
    } catch (err) {
      alert("❌ Export Excel ผิดพลาด: " + err.message);
      console.error("📛 Excel Export Error:", err);
    }
  };
  
  
  
  
  
  const handleExportCSV = () => {
    if (!selectedChartId) {
      alert("❌ กรุณาเลือกตารางก่อนการ Export");
      return;
    }
  
    const selectedItem = pages[currentPage].find(item => item.id === selectedChartId);
  
    if (!selectedItem) {
      console.error("❌ ไม่พบไอเท็มที่ตรงกับ ID ในหน้า:", selectedChartId);
    } else {
      console.log("✅ พบไอเท็มที่ตรงกับ ID:", selectedItem);
    }
  
    // 🔄 เปลี่ยนจากการเช็ค .type เป็นการเช็ค .viewMode
    if (!selectedItem || selectedItem.viewMode !== 'table') {
      alert("❌ กรุณาเลือกตารางที่ถูกต้องก่อนการ Export");
      return;
    }
  
    try {
      console.log("📌 Data ที่จะ Export:", selectedItem.chartData);
      const worksheet = XLSX.utils.json_to_sheet(selectedItem.chartData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
  
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `export-${Date.now()}.csv`;
      link.click();
    } catch (err) {
      alert("❌ Export CSV ผิดพลาด: " + err.message);
      console.error("📛 CSV Export Error:", err);
    }
  };

  
  return (
    <div className="fixed top-0 left-0 w-full">
         <DashNav reportId={report._id} reportName={reportName} setReportName={setReportName} />

         <div>
             <Sidebar />

             <div className=" ml-[5.5rem] ">
             {/* Toolbar */}
             <div className=" flex items-center bg-[#E3E3E3] h-[2rem] ">
               <Dropdown
                label="File"
                items={["New Report", "Open", "Save",{ label: "Export", subItems: ["PDF", "Excel", "CSV", "JPEG"] }]}
                onItemClick={handleDropdownClick}
                onSubItemClick={(subItem) => {
                  if (subItem === "JPEG") handleExportJPEG();
                  else if (subItem === "PDF") handleExportPDF();
                  else if (subItem === "Excel") handleExportExcel();
                  else if (subItem === "CSV") handleExportCSV();
                }}
              />
               

              {['edit', 'insert', 'arrange', 'view'].map((panel) => (
                <button
                  key={panel}
                  onClick={() => setActivePanel(panel)}
                  className={`px-4 text-[#2B3A67] h-full hover:bg-gray-300 border-b-[0.15rem] z-0 ${
                    activePanel === panel ? 'font-semibold border-[#2B3A67]' : 'border-transparent'
                  }`}
                >
                  {panel.charAt(0).toUpperCase() + panel.slice(1)}
                </button>
              ))}
            </div>
         
          
  
            
            

            {/* page */}
              <div className="fixed bottom-5 flex-1 flex flex-col ">
               <div className="bg-white flex h-[2.5rem] items-center">
            
               {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    onContextMenu={(e) => handleRightClick(e, index)}
                    className={`px-4 py-2 border-r border-t-[0.1rem] border-l-[0.1rem] border-[#2B3A67] ${
                      index === currentPage ? "bg-[#2B3A67] text-white" : "bg-white text-[#2B3A67]"
                    }`}
                  >
                    Page {index + 1}
                  </button>
                ))}


                  <button 
                    className="px-4 py-2 bg-[#1E2A4A] border-[#2B3A67] border-t-[0.12rem] text-white " 
                    onClick={addPage}>
                    + 
                  </button>

                 
                  
              </div>

               {/* แสดงเนื้อหาของหน้าปัจจุบัน */}
              <div >
                <h2>{pages[currentPage].title}</h2>
                <p>{pages[currentPage].content}</p>

               
              </div>

              
            </div>
          </div>

          {/* Status bar */}
              <div className="fixed bottom-0 w-full flex justify-between items-center bg-[#E3E3E3] h-[1.25rem] px-4 text-sm self-start z-50">
                     {/* Page Info */}
                     <div className="flex items-center space-x-2">
                       <span className="text-black text-sm">page {currentPage + 1} from {pages.length}</span>
                     </div>

                   {/* Zoom Section */}
                     <div className="flex items-center ">
                       <button onClick={handleZoomOut} className=" w-[1rem] hover:bg-gray-400">-</button>
                       <div className="w-24 bg-gray-400 h-2 rounded relative">
                         <div 
                            className="absolute left-1/2 transform -translate-x-1/2 bg-gray-600 h-2 w-3 rounded"
                            style={{ left: `${(zoomLevel - 0.5) * 100}%` }} >
                        </div>
                      </div>
                      <button onClick={handleZoomIn} className=" w-[1rem] hover:bg-gray-400">+</button>
                      <span className=" w-15 items-center text-black  px-2">{Math.round(zoomLevel * 100)}%</span>
                    </div>
            </div>

        </div>
      </div>
      
  );
};

export default Toolbar;


function Dropdown({ label, items, onItemClick, onSubItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 text-[#2B3A67] h-full hover:bg-gray-300"
      >
        {label}
      </button>

      {isOpen &&
        createPortal(
          <ul
            className="absolute top-full mt-1 left-0 bg-white text-black shadow-lg rounded-md w-40 z-[9999] border border-gray-300"
            style={{
              position: "absolute",
              left: dropdownRef.current?.getBoundingClientRect().left + "px",
              top:
                dropdownRef.current?.getBoundingClientRect().bottom +
                window.scrollY +
                "px",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className="relative px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onMouseEnter={() => item.subItems && setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {typeof item === "string" ? item : item.label}

                {/* Submenu */}
                {item.subItems && hoveredItem === index && (
                  <ul className="absolute left-full top-0 bg-white text-black shadow-lg rounded-md w-40 z-[9999] border border-gray-300">
                    {item.subItems.map((subItem, subIndex) => (
                      <li 
                        key={subIndex} 
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        // onClick={() => onSubItemClick?.(subItem)}
                        onMouseDown={() => onSubItemClick?.(subItem)}
                      >
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};


