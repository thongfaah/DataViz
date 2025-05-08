// "use client"
// import { useState, useRef, useEffect } from "react";
// import MoreGraphSidebar from "../MoreGraphSidebar/page";
// import { ChevronRight, ChevronLeft, Search } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import BarChartComponent from "../BarChartComponent/page";

// function DataViz({viewMode, setViewMode}) {

//   const [isDropdownOpen, setIsDropdownOpen] = useState(null);
//   const [showMoreGraphSidebar, setShowMoreGraphSidebar] = useState(false);

//   const toggleDropdown = (dropdownId) => {
//     setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
//   };


//   return (
    
//     <div className="relative">
//                 <button 
//                   onClick={() => toggleDropdown("graph")}
//                   className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"
//                 >
//                     <svg className="px-2" width="35" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <g clipPath="url(#clip0_139_1762)">
//                       <path fillRule="evenodd" clipRule="evenodd" d="M2.14286 1.07143C2.14286 0.479694 1.66316 0 1.07143 0C0.479694 0 0 0.479694 
//                       0 1.07143V18.9286C0 19.5203 0.479694 20 1.07143 20H18.9286C19.5203 20 20 19.5203 20 18.9286C20 18.3369 19.5203 17.8571 18.9286 
//                       17.8571H2.14286V13.8861L5.28914 10.5262C5.70477 10.7625 6.18553 10.8975 6.69783 10.8975C7.34573 10.8975 7.9432 10.6816 8.42224 
//                       10.3178L10.4557 12.2145C10.3614 12.4983 10.3103 12.8018 10.3103 13.1173C10.3103 14.6973 11.5911 15.978 13.171 15.978C14.751 15.978 
//                       16.0317 14.6973 16.0317 13.1173C16.0317 12.3797 15.7526 11.7073 15.2941 11.2L15.297 11.1924L16.9521 6.6462C18.4099 6.51753 19.5529 5.29341 
//                       19.5529 3.80231C19.5529 2.22551 18.2746 0.947266 16.6979 0.947266C15.121 0.947266 13.8428 2.22551 13.8428 3.80231C13.8428 4.69759 14.2548 
//                       5.4966 14.8997 6.02007L13.3551 10.2625C13.2942 10.2586 13.2329 10.2566 13.171 10.2566C12.693 10.2566 12.2424 10.3739 11.8463 10.5812L9.64123 
//                       8.52452C9.60443 8.4902 9.56586 8.45897 9.52584 8.43081C9.54303 8.30413 9.55191 8.1748 9.55191 8.04339C9.55191 6.46711 8.2741 5.1893 6.69783 
//                       5.1893C5.12156 5.1893 3.84373 6.46711 3.84373 8.04339C3.84373 8.3134 3.88123 8.57464 3.95129 8.82221C3.9371 8.83579 3.9232 8.84984 3.90961 8.86436L2.14286 10.7511V1.07143Z" fill="black"/>
//                       </g>
//                       <defs>
//                       <clipPath id="clip0_139_1762">
//                       <rect width="20" height="20" fill="white"/>
//                       </clipPath>
//                       </defs>
//                     </svg>

//                      graph

//                     <svg className="px-2" width="35" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                 </button>

//                 {/* {isDropdownOpen === "graph" && (
//                     <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
//                         <li 
//                           className={`flex space-x-2 px-4 py-2 cursor-pointer items-center hover:bg-gray-200 ${viewMode === "table" ? "bg-gray-200 text-black" : ""}`}
//                           onClick={() => setViewMode("table")} 
//                         >
//                           <img 
//                             src="/table.png" alt="table" style={{ width: '38px', height: 'auto' }} 
//                             className=" px-2 max-h-full object-contain "
//                           />
//                             Table
//                         </li>

//                         <li className={`flex space-x-2 px-4 py-2 cursor-pointer items-center hover:bg-gray-200 ${viewMode === "chart" ? "bg-gray-200 text-black" : ""}`}
//                         onClick={() => setViewMode("chart")}>
//                             <img 
//                                 src="/Bar-chart.png" alt="Bar chart" style={{ width: '35px', height: 'auto' }} 
//                                 className=" px-2 max-h-full object-contain "
//                             />
//                             Bar chart
//                         </li>

//                         <li className={`flex space-x-2 px-4 py-2 cursor-pointer items-center hover:bg-gray-200 ${viewMode === "pie" ? "bg-gray-200 text-black" : ""}`}
//                           onClick={() => setViewMode("pie")}
//                         >
//                             <img 
//                                 src="/Pie-chart.png" alt="Pie chart" style={{ width: '38px', height: 'auto' }} 
//                                 className=" px-2 max-h-full object-contain "
//                             />
//                             Pie chart
//                         </li>

//                         <li className={`flex space-x-2 px-4 py-2 cursor-pointer items-center hover:bg-gray-200 ${viewMode === "line" ? "bg-gray-200 text-black" : ""}`} 
//                           onClick={() => setViewMode("line")}
//                         >
//                             <img 
//                                 src="/Line-chart.png" alt="Line chart" style={{ width: '38px', height: 'auto' }} 
//                                 className=" px-2 max-h-full object-contain "
//                             />
//                             Line chart
//                         </li>

//                         <li 
//                         onClick={() => setShowMoreGraphSidebar(true)}
//                         className="flex px-6 py-2 hover:bg-gray-200 cursor-pointer items-center text-gray-500">
//                             more graph
//                         </li>


//                     </ul>
//                     )} */}

//                 {isDropdownOpen === "graph" && (
//                   <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
//                     {[
//                       { key: "table", label: "Table", icon: "/table.png" },
//                       { key: "bar", label: "Bar chart", icon: "/Bar-chart.png" },
//                       { key: "pie", label: "Pie chart", icon: "/Pie-chart.png" },
//                       { key: "line", label: "Line chart", icon: "/Line-chart.png" }
//                     ].map(({ key, label, icon }) => (
//                       <li
//                         key={key}
//                         className={`flex space-x-2 px-4 py-2 cursor-pointer items-center hover:bg-gray-200 ${
//                           viewMode === key ? "bg-gray-200 text-black" : ""
//                         }`}
//                         onClick={() => setViewMode(key)}
//                       >
//                         <img
//                           src={icon}
//                           alt={label}
//                           style={{ width: "35px", height: "auto" }}
//                           className="px-2 max-h-full object-contain"
//                         />
//                         {label}
//                       </li>

                      
//                     ))}

//                   <li 
//                     onClick={() => setShowMoreGraphSidebar(true)}
//                     className="flex px-6 py-2 hover:bg-gray-200 cursor-pointer items-center text-gray-500">
//                       more graph
//                   </li>
//                   </ul>
//                 )}

//               {showMoreGraphSidebar && (
//                 <MoreGraphSidebar onClose={() => setShowMoreGraphSidebar(false)} />
//               )}
//                 </div>
//   )
// }

// export default DataViz

"use client";

import React, { useState } from "react";
import MoreGraphSidebar from "../MoreGraphSidebar/page";

const DataViz = ({ viewMode, setViewMode, selectedFile, data, selectedColumns, selectedChartId, onChangeAxis }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [showMoreGraphSidebar, setShowMoreGraphSidebar] = useState(false);

  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => toggleDropdown("graph")}
        className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"
      >
        <svg className="px-2" width="35" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_139_1762)">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.14286 1.07143C2.14286 0.479694 1.66316 0 1.07143 0C0.479694 0 0 0.479694 0 1.07143V18.9286C0 19.5203 0.479694 20 1.07143 20H18.9286C19.5203 20 20 19.5203 20 18.9286C20 18.3369 19.5203 17.8571 18.9286 17.8571H2.14286V13.8861L5.28914 10.5262C5.70477 10.7625 6.18553 10.8975 6.69783 10.8975C7.34573 10.8975 7.9432 10.6816 8.42224 10.3178L10.4557 12.2145C10.3614 12.4983 10.3103 12.8018 10.3103 13.1173C10.3103 14.6973 11.5911 15.978 13.171 15.978C14.751 15.978 16.0317 14.6973 16.0317 13.1173C16.0317 12.3797 15.7526 11.7073 15.2941 11.2L15.297 11.1924L16.9521 6.6462C18.4099 6.51753 19.5529 5.29341 19.5529 3.80231C19.5529 2.22551 18.2746 0.947266 16.6979 0.947266C15.121 0.947266 13.8428 2.22551 13.8428 3.80231C13.8428 4.69759 14.2548 5.4966 14.8997 6.02007L13.3551 10.2625C13.2942 10.2586 13.2329 10.2566 13.171 10.2566C12.693 10.2566 12.2424 10.3739 11.8463 10.5812L9.64123 8.52452C9.60443 8.4902 9.56586 8.45897 9.52584 8.43081C9.54303 8.30413 9.55191 8.1748 9.55191 8.04339C9.55191 6.46711 8.2741 5.1893 6.69783 5.1893C5.12156 5.1893 3.84373 6.46711 3.84373 8.04339C3.84373 8.3134 3.88123 8.57464 3.95129 8.82221C3.9371 8.83579 3.9232 8.84984 3.90961 8.86436L2.14286 10.7511V1.07143Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0_139_1762">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        graph

        <svg className="px-2" width="35" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isDropdownOpen === "graph" && (
  <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
    {["table", "bar", "pie", "line"].map((key) => (
      <li
        key={key}
        className={`flex space-x-2 px-4 py-2 cursor-pointer items-center hover:bg-gray-200 
        ${viewMode === key && key !== "table" ? "bg-gray-200 text-black" : ""}`} // ไม่ให้ table มีพื้นหลังเทา
        onClick={() => {
          setViewMode(key);
          setIsDropdownOpen(false);
        }}
      >
        <img
          src={`/${key === "bar" ? "Bar-chart" : key === "pie" ? "Pie-chart" : key === "line" ? "Line-chart" : "table"}.png`}
          alt={key}
          style={{ width: "35px", height: "auto" }}
          className="px-2 max-h-full object-contain"
        />
        {key.charAt(0).toUpperCase() + key.slice(1).replace("-chart", " chart")}
      </li>
    ))}

          <li
            onClick={() => setShowMoreGraphSidebar(true)}
            className="flex px-6 py-2 hover:bg-gray-200 cursor-pointer items-center text-gray-500"
          >
            more graph
          </li>
        </ul>
      )}

      {showMoreGraphSidebar && (
        <MoreGraphSidebar 
          onClose={() => setShowMoreGraphSidebar(false)} 
          setViewMode={setViewMode}
          selectedFile={selectedFile}
          data={data}
          selectedColumns={selectedColumns}
          selectedChartId={selectedChartId}
          onChangeAxis={onChangeAxis} 
        />
      )}
    </div>
  );
};

export default DataViz;
