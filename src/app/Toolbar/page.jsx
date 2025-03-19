"use client"

import { useState, useRef, useEffect } from "react";
import DashNav from "../dash-nav/page";
import Sidebar from "../Sidebar/page";
import DataViz from "../DataViz/page";
import { createPortal } from "react-dom";

const Toolbar = ({ activePanel, setActivePanel }) => {
  const [pages, setPages] = useState([[]]); // เก็บข้อมูลของแต่ละหน้า
  const [currentPage, setCurrentPage] = useState(0);

     // เพิ่มหน้ากระดาษใหม่
  const addPage = () => {
    setPages([...pages, []]);
    setCurrentPage(pages.length);
  };

  const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2)); // เพิ่มซูมสูงสุดที่ 200%
  };
  
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.1)); // ลดซูมต่ำสุดที่ 10%
  };

  const handleSelectChange = (e) => {
    setZoomLevel(parseFloat(e.target.value));
  };

  return (
    <div className="fixed top-0 left-0 w-full">
         <DashNav />

         <div>
             <Sidebar />

             <div className=" ml-[5.5rem] ">
             {/* Toolbar */}
             <div className=" flex items-center bg-[#E3E3E3] h-[2rem] ">
               <Dropdown
                label="File"
                items={["New Report", "Open", "Save",{ label: "Export", subItems: ["PDF", "Excel", "CSV", "JPEG"] }]}
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
         
            {/* Content Area */}
              <div className="fixed w-full  h-full p-4 border-gray-300 border-l-2 bg-white z-0"></div>

            {/* page */}
              <div className="fixed bottom-5 flex-1 flex flex-col ">
               <div className="bg-white flex h-[2.5rem] items-center">
            
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={ `px-4 py-2 border-r  border-t-[0.1rem] border-l-[0.1rem] border-[#2B3A67] ${index === currentPage ? "bg-[#2B3A67] text-white" : "bg-white text-[#2B3A67]"}`}
                    >
                      Page {index + 1}
                    </button> 
                  ))}

                  <button className="px-4 py-2 bg-[#1E2A4A] border-[#2B3A67] border-t-[0.12rem] text-white " onClick={addPage}>
                    + 
                  </button>
                  
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


function Dropdown({ label, items }) {
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
                      <li key={subIndex} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
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


