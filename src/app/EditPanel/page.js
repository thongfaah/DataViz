import React, { useState, useRef, useEffect } from "react";
import TablePage from "../tablepage/page";
import { Rnd } from "react-rnd";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import FilterSidebar from "../FilterSidebar/page";

const EditPanel = ({ onCopy, onCut, onPaste, onDelete, onSelectAll, refreshSidebar, onUndo, onRedo }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showFileMenu, setShowFileMenu] = useState(false);
    const fileInputRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [fileName, setFileName] = useState("");
    const [size, setSize] = useState({ width: 1000, height: 700 });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showFilter, setShowFilter] = useState(false); // เพิ่มการประกาศ State
    
    const router = useRouter();
    const handleApplyFilter = (filterData) => {
        console.log("Filter Applied: ", filterData);
        applyFilterToChart(filterData);
    };

    const centerPosition = () => ({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
      });
      const [position, setPosition] = useState(centerPosition());
    
      const resetPosition = () => {
        setPosition(centerPosition());
      };

    const toggleFullScreen = () => {
        if (isFullScreen) {
        setPosition(centerPosition());
        } else {
        resetPosition();
        }
        setIsFullScreen(!isFullScreen);
    };

    const handleRefreshDashboard = () => {
        router.refresh();
    };


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
      
        try {
          // ✅ สร้าง FormData เพื่อเตรียมส่งไป API
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", file.name);
      
          // ✅ เรียก API เพื่ออัปโหลด
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
      
          // ✅ ตรวจสอบ Response
          const result = await res.json();
          if (!res.ok) {
            console.error("Response Error:", result);
            throw new Error(result.error || "Upload failed");
          }
      
          console.log("Upload Success:", result);

          refreshSidebar(); 
      
          // ✅ แสดง Popup ทันทีเมื่อ Upload สำเร็จ
          setFileName(file.name); 
          setShowPopup(true); 
          resetPosition(); 
      
        } catch (error) {
          console.error("Upload Error:", error.message);
          alert("❌ อัปโหลดไฟล์ล้มเหลว!");
        }
      };
      
    return (
    
            <div className="relative bg-[#F5F5F5]  h-[2.5rem] top-[7.25rem] flex z-10 overflow-visible">

             {/* undo */}
                 <button 
                    className="flex px-4 h-full hover:bg-[#E3E3E3] items-center"
                    onClick={onUndo}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.13012 18.3099H15.1301C17.8901 18.3099 20.1301 16.0699 20.1301 13.3099C20.1301 10.5499 17.8901 8.30994 15.1301 8.30994H4.13012M6.43012 10.8099L3.87012 8.24994L6.43012 5.68994" 
                        stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button> 

                    {/* redo */}
                <button 
                    className="flex px-4 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                    onClick={onRedo}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8701 18.3099H8.87012C6.11012 18.3099 3.87012 16.0699 3.87012 13.3099C3.87012 10.5499 6.11012 8.30994 8.87012 8.30994H19.8701M17.5701 
                        10.8099L20.1301 8.24994L17.5701 5.68994" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button> 

                    {/* copy and paste */}
                {/* <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center ">
                    <img 
                        src="/paste1.png" alt="paste1" style={{ width: '30px', height: 'auto' }} 
                        className=" max-h-full object-contain "
                    />
                </button> */}

                <div className="relative ">
                    <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex px-1 h-full items-center border-r-2"
                    >
                     <img 
                        src="/paste1.png" alt="paste1" style={{ width: '30px', height: 'auto' }} 
                        className=" max-h-full object-contain "
                    />

                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </button>
                    {isDropdownOpen && (
                    <ul className="absolute top-full mt-1 left-0 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300 ">
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                        onClick={onPaste}>
                            <img 
                                src="/paste2.png" alt="paste2" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            paste
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                        onClick={onCopy}>
                            <img 
                                src="/copy.png" alt="copy" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            copy
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center pl-4"
                        onClick={onCut}>
                            <img 
                                src="/cut.png" alt="cut" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            cut
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                        onClick={onDelete}>
                            <img 
                                src="/delete.png" alt="delete" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            delete
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
                        onClick={onSelectAll}>
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
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"
                onClick={() => setShowFileMenu(!showFileMenu)}> 
                    <img 
                        src="/add_data.png" alt="addData" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Add data

                    <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>

                </button> 
                {showFileMenu && (
                    <ul className="absolute top-full mt-1 left-[11rem] bg-white text-black shadow-md rounded-md w-40 z-50 border border-gray-300">
                        <li
                            onClick={() => {
                                fileInputRef.current.accept = ".csv";
                                fileInputRef.current.click();
                                setShowFileMenu(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            Import CSV
                        </li>
                        <li
                            onClick={() => {
                                fileInputRef.current.accept = ".txt";
                                fileInputRef.current.click();
                                setShowFileMenu(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            Import TXT
                        </li>
                    </ul>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <Rnd
                    size={isFullScreen ? { width: "100%", height: "100%" } : size}
                    position={isFullScreen ? { x: 0, y: 0 } : position}
                    onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
                    onResizeStop={(e, direction, ref, delta, newPosition) => {
                    setSize({
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                    });
                    }}
                    enableResizing={{
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                    topRight: true,
                    topLeft: true,
                    bottomRight: true,
                    bottomLeft: true,
                    }}
                    minWidth={500}
                    minHeight={500}
                    className="bg-white rounded shadow-lg border-2 border-[#2B3A67] rnd-container"
                >
                    <div className="relative h-full">
                    <button
                        onClick={() => {
                        setShowPopup(false);
                        resetPosition();
                        }}
                        className="absolute top-2 right-2 text-gray-500"
                    >
                        ╳
                    </button>
                    <button
                        onClick={toggleFullScreen}
                        className="absolute text-2xl text-gray-500 top-1 right-10"
                    >
                        {isFullScreen ? "🗗" : "▢"}
                    </button>
                    <TablePage fileName={fileName} />
                    <div className="absolute bottom-6 right-0 w-full flex flex-row justify-end bg-white space-x-4 px-8 py-2 ">

                        <button 
                            className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400"
                            
                            // onClick={async () => {
                            //     try {
                            //         if (!fileName) {
                            //             alert("❗ กรุณาเลือกไฟล์ก่อน");
                            //             return;
                            //         }
                        
                            //         //  ✅ สร้าง FormData สำหรับอัปโหลด
                            //         const formData = new FormData();
                            //         formData.append("file", fileInputRef.current.files[0]);
                            //         formData.append("fileName", fileName);
                                
                            //         // ✅ เรียก API เพื่ออัปโหลดข้อมูล
                            //         const res = await fetch("/api/upload", { // <--- เปลี่ยน Path ให้ถูกต้อง
                            //             method: "POST",
                            //             body: formData,
                            //         });
                                
                            //         const result = await res.json();
                            //         if (!res.ok) {
                            //             throw new Error(result.error || "ไม่สามารถอัปโหลดข้อมูลได้");
                            //         }
                                
                            //         alert("✅ อัปโหลดข้อมูลลงฐานข้อมูลเรียบร้อยแล้ว!");
                                
                            //         // ✅ ปิด Popup หลังจากอัปโหลดเสร็จ
                            //         setShowPopup(false); 
                            //         resetPosition(); 
                                
                            //     } catch (error) {
                            //         console.error("❌ Upload & Save Report Error:", error.message);
                            //         alert("❌ เกิดข้อผิดพลาดระหว่างการอัปโหลดข้อมูล");
                            //     }
                            // }} 
                        >
                        Upload
                        </button>

                        <button className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400">
                        Processing Data
                        </button>

                        <button
                        onClick={() => setShowPopup(false)}
                        className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400"
                        >
                        Cancel
                        </button>

                    </div>
                    </div>
                </Rnd>
                </div>
            )}

                    {/* refresh */}
                <button 
                    className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 "
                    // onClick={handleRefreshDashboard}
                    onClick={() => window.location.reload()}
                >
                    <img 
                        src="/refresh.png" alt="refresh" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    
                </button> 

                    {/* New table */}
                   
                    {/* <button 
                        onClick={addTable}
                        className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/newtable.png" alt="newTable" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    new table
                </button> */}
                

                {/* text */}
                {/* <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/text.png" alt="text" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Text
                </button>  */}

                {/* Fillter */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"
                // onApply={handleApplyFilter}
                onClick={() => setShowFilter(true)} >
                
                    <img 
                        src="/fillter.png" alt="Fillter" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Fillter
                </button> 

                {showFilter && (
                    <FilterSidebar
                        onClose={() => setShowFilter(false)}
                        onApply={handleApplyFilter}
                    />
                )}

                 {/* Processing Data*/}
                 <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/transform.png" alt="transformData" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Processing Data
                </button>
                </div>
        
    );
};

export default EditPanel;