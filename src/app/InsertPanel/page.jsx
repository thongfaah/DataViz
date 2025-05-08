
"use client";

import React, { useState, useRef, useEffect } from "react";
import DataViz from "../DataViz/page";

const InsertPanel = ({ addTable, addTextBox, viewMode, setViewMode, selectedFile, selectedColumns, data, selectedChartId, onChangeAxis, onAddShape }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setImageFile(file);
  };

  useEffect(() => {
    if (imageFile && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx.clearRect(0, 0, img.width, img.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const toggleDropdown = (id) => {
    setIsDropdownOpen((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative bg-[#F5F5F5] h-[2.5rem] flex top-[7.25rem]">
      {/* Add Page */}
      <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 border-[#B3B3B3]">
        <img src="/addPage.png" alt="addPage" className="px-2 w-[38px] object-contain" />
      </button>

      {/* Add Table */}
      <button onClick={addTable} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center text-sm border-r-2">
        <svg className="px-2" width="39" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.42 35.44H4.26C3.91 35.44 3.59 35.27 3.34 34.99C3.10 34.70 2.96 34.30 2.96 33.90V21.56C2.96 21.15 3.10 20.76 3.34 20.47C3.59 20.18 3.91 20.02 4.26 20.02H9.42C9.77 20.02 10.09 20.18 10.34 20.47C10.58 20.76 10.71 21.15 10.71 21.56V33.90C10.71 34.30 10.58 34.70 10.34 34.99C10.09 35.27 9.77 35.44 9.42 35.44Z" fill="#2B3A67" opacity="0.25" />
          <path d="M18.13 35.46H12.96C12.62 35.46 12.29 35.30 12.05 35.01C11.80 34.72 11.67 34.33 11.67 33.92V3.08C11.67 2.67 11.80 2.28 12.05 1.99C12.29 1.70 12.62 1.54 12.96 1.54H18.13C18.47 1.54 18.80 1.70 19.04 1.99C19.28 2.28 19.42 2.67 19.42 3.08V33.92C19.42 34.33 19.28 34.72 19.04 35.01C18.80 35.30 18.47 35.46 18.13 35.46Z" fill="#2B3A67" />
          <path d="M26.79 35.44H21.62C21.28 35.44 20.95 35.27 20.71 34.99C20.46 34.70 20.33 34.30 20.33 33.89V15.39C20.33 14.99 20.46 14.59 20.71 14.31C20.95 14.02 21.28 13.85 21.62 13.85H26.79C27.13 13.85 27.46 14.02 27.70 14.31C27.94 14.59 28.08 14.99 28.08 15.39V33.89C28.08 34.30 27.94 34.70 27.70 34.99C27.46 35.27 27.13 35.44 26.79 35.44Z" fill="#2B3A67" opacity="0.5" />
        </svg>
        new table
      </button>

      {/* Add Text */}
      <button onClick={addTextBox} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center">
        <img src="/text.png" alt="text" className="px-2 w-[38px] object-contain" />
      </button>

      {/* Square */}
                 <div className="relative">
                 <button 
                   onClick={() => toggleDropdown("square")} 
                   className="flex px-2 h-full hover:bg-[#E3E3E3] items-center"
                 >
                     <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black"/>
                     </svg>

                     <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                 </button>
     
                 {isDropdownOpen === "square" && (
                     <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
                         <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center "
                         onClick={() => onAddShape("square")}
                         >
                           <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black"/>
                           </svg>
                             square
                         </li>

                         <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                         onClick={() => onAddShape("circle")}
                         >
                             <img 
                                 src="/circle.png" alt="circle" style={{ width: '38px', height: 'auto' }} 
                                 className=" px-2 max-h-full object-contain "
                             />
                             circle
                          </li>
                     </ul>
                     )}
                 </div>

                 {/* line */}
                 <div className="relative">
                 <button 
                   onClick={() => toggleDropdown("line")}
                   className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                 >
                     <img 
                         src="/line.png" alt="line" style={{ width: '38px', height: 'auto' }} 
                         className=" px-2 max-h-full object-contain "
                      />

                     <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                 </button>

                 {isDropdownOpen === "line" && (
                     <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
                         <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center "
                         onClick={() => onAddShape("line")}
                         >
                           <img 
                             src="/line.png" alt="line" style={{ width: '38px', height: 'auto' }} 
                             className=" px-2 max-h-full object-contain "
                           />
                             line
                         </li>

                         <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                         onClick={() => onAddShape("arrow")}>
                             <img 
                                 src="/arrow.png" alt="arrow" style={{ width: '35px', height: 'auto' }} 
                                 className=" px-2 max-h-full object-contain "
                             />
                             arrow
                         </li>

                         <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                         onClick={() => onAddShape("curve-line")}>
                             <img 
                                 src="/curve-line.png" alt="curveLine" style={{ width: '38px', height: 'auto' }} 
                                 className=" px-2 max-h-full object-contain "
                             />
                             curve line
                         </li>
                     </ul>
                    )}
                 </div>

      {/* Add Image */}
      {/* <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      <button onClick={handleButtonClick} className="flex px-4 h-full hover:bg-[#E3E3E3] items-center border-r-2">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.91 22.75L17.27 13L22.14 17.88M6.91 22.75H19.09C21.11 22.75 22.75 21.11 22.75 19.09V13M6.91 22.75C4.89 22.75 3.25 21.11 3.25 19.09V6.91C3.25 4.89 4.89 3.25 6.91 3.25H14.83M22.75 6.86L20.26 9.34M20.26 9.34L17.88 6.98M20.26 9.34V3.25M10.56 8.73C10.56 9.74 9.74 10.56 8.73 10.56C7.72 10.56 6.91 9.74 6.91 8.73C6.91 7.72 7.72 6.91 8.73 6.91C9.74 6.91 10.56 7.72 10.56 8.73Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button> */}

      {/* DataViz (graph dropdown) */}
      <DataViz 
        viewMode={viewMode} 
        setViewMode={setViewMode}
        selectedFile={selectedFile}
        data={data}
        selectedColumns={selectedColumns}
        selectedChartId={selectedChartId}
        onChangeAxis={onChangeAxis} 
      />
    </div>
  );
};

export default InsertPanel;
