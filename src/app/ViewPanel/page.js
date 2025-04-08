import React, { useState } from "react";
import CanvasArea from "../CanvasArea/page";

const ViewPanel = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = (dropdownId) => {
        setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
    };

    const [zoomLevel, setZoomLevel] = useState(1);
    const handleSelectChange = (e) => {
        setZoomLevel(parseFloat(e.target.value));
    };

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    return(
        <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex top-[7.25rem]">

                {/* fit all */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center text-sm"> 
                    <img 
                        src="/fit_all.png" alt="fit-all" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                   fit all
                </button>

                {/* fit width */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"> 
                    <img 
                        src="/fit_width.png" alt="fit-width" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                   fit width
                </button>

                {/* zoom */}
                <div className="flex px-2 h-full items-center border-r-2 text-sm"> 
                <span className="text-black">Zoom</span>
                  <div className="relative px-2">
                    <input
                      type="text"
                      value={`${Math.round(zoomLevel * 100)}%`}
                      readOnly
                      className="w-16 text-center border rounded-md"
                    />

                    <svg
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    
                    <select
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleSelectChange}
                      value={zoomLevel}
                    >
                      <option value="0.25">25%</option>
                      <option value="0.5">50%</option>
                      <option value="0.75">75%</option>
                      <option value="1">100%</option>
                      <option value="1.5">150%</option>
                      <option value="2">200%</option>
                    </select>
                  </div>

                </div>

              {/* More option */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("More option")} 
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"
                >
                    More option

                    <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                </button>
                
                {isDropdownOpen === "More option" && (
                    <div className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[8rem] z-50 border border-gray-300">

                    <label className="flex px-4 py-2 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checked1}
                      onChange={() => setChecked1(!checked1)}
                      className=" cursor-pointer"
                    />
                      <span className="text-black px-2">Grid</span>
                    </label>
                    
                    
                    <label className="flex px-4 py-2 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={checked2}
                      onChange={() => setChecked2(!checked2)}
                      className="cursor-pointer"
                    />
                    <span className="text-black px-2">Lock</span>
                  </label>
                    </div>
                    )}

                  {/* <CanvasArea showGrid={checked1} isLocked={checked2} /> */}
                </div>
              </div>
    );
};

export default ViewPanel;