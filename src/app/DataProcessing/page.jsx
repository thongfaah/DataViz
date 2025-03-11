"use client"

import { useState, useRef, useEffect } from "react";

import DataViz from "../DataViz/page";



export default function Toolbar ({ onAddText }) {
  const [activePanel, setActivePanel] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);


  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };

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
        

        <div>
            

            <div>
            {/* Toolbar */}
            <div className=" flex items-center bg-[#E3E3E3] h-[2rem] ">
              <Dropdown
                label="File"
                items={["New Report", "Open", "Save",{ label: "Export", subItems: ["PDF", "Excel", "CSV", "JPEG"] }]}
              />

              {['Home', 'insert', 'arrange', 'view'].map((panel) => (
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
            
            {/* Edit Panel */}
            {activePanel === "Home" && (
                <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex ">

                    {/* undo */}
                <button className="flex px-4 h-full hover:bg-[#E3E3E3] items-center"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.13012 18.3099H15.1301C17.8901 18.3099 20.1301 16.0699 20.1301 13.3099C20.1301 10.5499 17.8901 8.30994 15.1301 8.30994H4.13012M6.43012 10.8099L3.87012 8.24994L6.43012 5.68994" 
                        stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                    {/* redo */}
                <button className="flex px-4 h-full hover:bg-[#E3E3E3] items-center border-r-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8701 18.3099H8.87012C6.11012 18.3099 3.87012 16.0699 3.87012 13.3099C3.87012 10.5499 6.11012 8.30994 8.87012 8.30994H19.8701M17.5701 
                        10.8099L20.1301 8.24994L17.5701 5.68994" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                    {/* copy and paste */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center ">
                    <img 
                        src="/paste1.png" alt="paste1" style={{ width: '30px', height: 'auto' }} 
                        className=" max-h-full object-contain "
                    />
                </button>

                <div className="relative ">
                    <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex px-1 h-full items-center border-r-2"
                    >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </button>
                    {isDropdownOpen && (
                    <ul className="absolute top-full mt-1 left-0 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300 ">
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/paste2.png" alt="paste2" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            paste
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/copy.png" alt="copy" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            copy
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center pl-4">
                            <img 
                                src="/cut.png" alt="cut" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            cut
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/delete.png" alt="delete" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            delete
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/selectall.png" alt="selectall" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            select all
                        </li>
                    </ul>
                    )}
                </div>
                
                    {/* add data */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"> 
                    <img 
                        src="/add_data.png" alt="addData" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Add data
                </button>

                    {/* refresh */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 ">
                    <img 
                        src="/refresh.png" alt="refresh" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    
                </button>

                    {/* New table */}
                    <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/newtable.png" alt="newTable" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    new table
                </button>

                {/* text */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/text.png" alt="text" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Text
                </button>

                {/* Fillter */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/fillter.png" alt="Fillter" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Fillter
                </button>

                 {/* Transform Data*/}
                 <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/transform.png" alt="transformData" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Transform Data
                </button>
                </div>
            )}

            {activePanel === "insert" && (
                <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex ">

                   {/* Add page */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 border-[#B3B3B3]">
                  <img 
                        src="/addPage.png" alt="addPage" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                </button>
    
                  {/* New table */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center text-sm  border-r-2 ">
                  <svg className="px-2" width="39" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.25" d="M9.42281 35.4372H4.25614C3.91357 35.4372 3.58503 35.2747 3.3428 34.9856C3.10056 34.6965 2.96448 34.3044 
                    2.96448 33.8955V21.5622C2.96448 21.1533 3.10056 20.7612 3.3428 20.4721C3.58503 20.1829 3.91357 20.0205 4.25614 20.0205H9.42281C9.76538 
                    20.0205 10.0939 20.1829 10.3362 20.4721C10.5784 20.7612 10.7145 21.1533 10.7145 21.5622V33.8955C10.7145 34.3044 10.5784 34.6965 10.3362 
                    34.9856C10.0939 35.2747 9.76538 35.4372 9.42281 35.4372Z" fill="#2B3A67"/>
                    <path d="M18.1257 35.4584H12.959C12.6165 35.4584 12.2879 35.296 12.0457 35.0069C11.8034 34.7178 11.6674 34.3256 11.6674 33.9167V3.08341C11.6674 2.67454 11.8034 2.28241 12.0457 1.99329C12.2879 1.70417 12.6165 1.54175 12.959 1.54175H18.1257C18.4683 1.54175 18.7968 1.70417 19.039 1.99329C19.2813 2.28241 19.4174 2.67454 19.4174 3.08341V33.9167C19.4174 34.3256 19.2813 34.7178 19.039 35.0069C18.7968 35.296 18.4683 35.4584 18.1257 35.4584Z" fill="#2B3A67"/>
                    <path opacity="0.5" d="M26.7862 35.4371H21.6195C21.277 35.4371 20.9484 35.2747 20.7062 34.9855C20.464 34.6964 20.3279 34.3043 20.3279 33.8954V15.3954C20.3279 14.9866 20.464 14.5944 20.7062 14.3053C20.9484 14.0162 21.277 13.8538 21.6195 13.8538H26.7862C27.1288 13.8538 27.4573 14.0162 27.6996 14.3053C27.9418 14.5944 28.0779 14.9866 28.0779 15.3954V33.8954C28.0779 34.3043 27.9418 34.6964 27.6996 34.9855C27.4573 35.2747 27.1288 35.4371 26.7862 35.4371Z" fill="#2B3A67"/>
                  </svg>
                  new table
                </button>

                {/* Text */}
                <button onClick={onAddText} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center">
                  <img 
                        src="/text.png" alt="text" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
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
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center ">
                          <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black"/>
                          </svg>
                            square
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
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
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center ">
                          <img 
                            src="/line.png" alt="line" style={{ width: '38px', height: 'auto' }} 
                            className=" px-2 max-h-full object-contain "
                          />
                            line
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/arrow.png" alt="arrow" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            arrow
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
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
                <button className="flex px-4 h-full hover:bg-[#E3E3E3] items-center border-r-2">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.90625 22.75L17.2656 13L22.1406 17.875M6.90625 22.75H19.0938C21.113 22.75 22.75 21.113 22.75 19.0938V13M6.90625 
                    22.75C4.88696 22.75 3.25 21.113 3.25 19.0938V6.90625C3.25 4.88696 4.88696 3.25 6.90625 3.25H14.8281M22.75 6.86301L20.2574 
                    9.34375M20.2574 9.34375L17.875 6.97515M20.2574 9.34375V3.25M10.5625 8.73438C10.5625 9.74402 9.74402 10.5625 8.73438 10.5625C7.72473 
                    10.5625 6.90625 9.74402 6.90625 8.73438C6.90625 7.72473 7.72473 6.90625 8.73438 6.90625C9.74402 6.90625 10.5625 7.72473 10.5625 8.73438Z" 
                    stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* graph */}
                <DataViz />
                </div>
            )}

            {/* Arrange */}
            {activePanel === "arrange" && (
                <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex ">

              {/* Bring froward */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("Bring froward")} 
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                >
                     <img 
                        src="/Bring-froward.png" alt="Bringfroward" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                      />

                    Bring froward

                    <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                </button>
                
                {isDropdownOpen === "Bring froward" && (
                    <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-45 z-50 border border-gray-300">
            
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Bring-froward.png" alt="Bringfroward" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Bring froward
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Bring-to-front.png" alt="Bringtofront" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Bring to front
                        </li>
                    </ul>
                    )}
                </div>
                
                 {/* Send Backward */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("Send Backward")} 
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                >
                     <img 
                        src="/Send-Backward.png" alt="SendBackward" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                      />

                    Send Backward

                    <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                </button>
                
                {isDropdownOpen === "Send Backward" && (
                    <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-45 z-50 border border-gray-300">
            
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Send-Backward.png" alt="SendBackward" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Send Backward
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Sent-to-Back.png" alt="SenttoBack" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Sent to Back
                        </li>
                    </ul>
                    )}
                </div>

                 {/* Group  */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("Group")} 
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                >
                     <img 
                        src="/Group.png" alt="Group" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                      />

                    Group 

                    <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                </button>
                
                {isDropdownOpen === "Group" && (
                    <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[9rem] z-50 border border-gray-300">
            
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Group.png" alt="Group" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            group
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/ungroup.png" alt="ungroup" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            ungroup
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/merge.png" alt="merge" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            merge
                        </li>
                    </ul>
                    )}
                </div>

                 {/* Align  */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown("Align")} 
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                >
                     <img 
                        src="/Align-left.png" alt="Align-left" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                      />

                    Align 

                    <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                </button>
                
                {isDropdownOpen === "Align" && (
                    <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[13rem] z-50 border border-gray-300">
            
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Align-left.png" alt="Align-left" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Align left
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Align-right.png" alt="Align-right" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Align right
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Horizontal-center.png" alt="Horizontal-center" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Horizontal center
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Vertical-center.png" alt="Vertical-center" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Vertical center
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Align-bottom.png" alt="Align-bottom" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Align bottom
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/Align-top.png" alt="Align-top" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            Align top
                        </li>
                    </ul>
                    )}
                </div>
              </div>
            )}

            {/* View */}
            {activePanel === "view" && (
                <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex ">

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
                </div>
                      
              </div>
            )}

             {/* Content Area */}
             <div className="fixed w-full  h-full p-4 border-gray-300 border-l-2 bg-white z-0"></div>
            
             
        </div>

             {/* Status bar */}
             <div className="fixed bottom-0 w-full flex items-center bg-[#E3E3E3] h-[1.25rem] px-4 text-sm self-start z-50">
                    
                    {/* Zoom Section */}
                    <div className="flex items-center justify-end ">
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
}

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative h-full " ref={dropdownRef} >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 text-[#2B3A67] h-full hover:bg-gray-300 "
      >
        {label}
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-full mt-1 left-0 bg-white text-black shadow-lg rounded-md w-40  z-50 border border-gray-300"
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
                <ul className="absolute left-full top-0 bg-white text-black shadow-lg rounded-md w-40  z-50 border border-gray-300">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    
  );
}

