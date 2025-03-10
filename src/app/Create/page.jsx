"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/page";
import Nav1 from "../navbar/page";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import TablePage from "../tablepage/page"; // Import TablePage
import { Rnd } from "react-rnd"; // Import Rnd


const Create = () => {
  const centerPosition = () => ({
    x: (window.innerWidth - size.width) / 2,
    y: (window.innerHeight - size.height) / 2,
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup
  const [fileName, setFileName] = useState(""); // State for file name
  const [isFullScreen, setIsFullScreen] = useState(false); // State for fullscreen
  const [size, setSize] = useState({ width: 1000, height: 700 }); // State for size
  const [position, setPosition] = useState(centerPosition());
  const router = useRouter();
  const handleUploadClick = () => {
    router.push('/Dashboard'); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
  };
  const handleProcessingClick = () => {
    router.push('/DataProcessing'); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name); // ✅ ส่งชื่อไฟล์ไปให้ Backend
  
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Upload failed");
      }
  
      setFileName(file.name); // Set file name
      setShowPopup(true); // Show popup
      resetPosition(); // Reset position to center
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ อัปโหลดไฟล์ล้มเหลว!");
    } finally {
      setLoading(false);
    }
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      setPosition(centerPosition());
    } else {
      resetPosition();
    }
    setIsFullScreen(!isFullScreen);
  };
  const resetPosition = () => {
    setPosition(centerPosition());
  };
  const keepPopupInViewport = () => {
    setPosition((prev) => ({
      x: Math.min(Math.max(prev.x, 0), window.innerWidth - size.width),
      y: Math.min(Math.max(prev.y, 0), window.innerHeight - size.height),
    }));
  };
  useEffect(() => {
    if (!isFullScreen) {
      keepPopupInViewport();
    }
  }, [size, isFullScreen]);
  
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Nav1 />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex-wrap relative min-h-screen bg-[#F5F5F5] ml-[5.5rem]">
          <h1 className="absolute top-12 left-16 text-2xl font-bold text-[#2B3A67]">
            Import Data
          </h1>
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <label htmlFor="file-uploadCSV">
              <img
                src="/createCSV.png"
                alt="CreateCSV"
                style={{ width: "300px", height: "auto" }}
                className="absolute top-28 left-16 max-w-full max-h-full object-contain"
              />
            </label>
            <input
              id="file-uploadCSV"
              type="file"
              className="hidden"
              accept=".csv" 
              onChange={handleFileChange}
            />
            {loading && <p className="text-red-500 mt-4">Uploading...</p>}
          </div>
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <label htmlFor="file-uploadtxt">
              <img
                src="/createtxt.png"
                alt="Createtxt"
                style={{ width: "290px", height: "auto" }}
                className="absolute top-28 left-1/4 max-w-full max-h-full object-contain"
              />
            </label>
            <input
              id="file-uploadtxt"
              type="file"
              className="hidden"
              accept=".txt" 
              onChange={handleFileChange}
            />
            {loading && <p className="text-red-500 mt-4">Uploading...</p>}
          </div>
          <h1 className="absolute top-96 left-1/3 text-2xl font-bold text-[#2B3A67]">
            เลือก data ลงในรายงานของคุณ
          </h1>
        </div>
      </div>
      
      {showPopup && (
        <div className="fixed  inset-0 flex items-center justify-center z-50">
          <Rnd
            size={isFullScreen ? { width: "100%", height: "100%" } : size}
            position={isFullScreen ? { x: 0, y: 0 } : position}
            onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, newPosition) => {
              setSize({
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
              });
            
              // ป้องกันไม่ให้ popup ออกไปนอกหน้าจอ
              setPosition({
                x: Math.max(0, newPosition.x),
                y: Math.max(0, newPosition.y),
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
            minWidth={500} // กำหนดขนาดที่เล็กที่สุดของความกว้าง
            minHeight={500} // กำหนดขนาดที่เล็กที่สุดของความสูง
            className="bg-white rounded shadow-lg border-2 border-[#2B3A67] rnd-container"
          >
            <div className="relative h-full">
              <button onClick={() => { setShowPopup(false); resetPosition(); }} className="absolute top-2 right-2 text-gray-500">╳</button>
              <button onClick={toggleFullScreen} className="absolute text-2xl text-gray-500 top-1 right-10">
                {isFullScreen ? "🗗" : "▢"}
              </button>
              <TablePage fileName={fileName} />
              <div className="absolute bottom-6 right-0 w-full flex flex-row justify-end bg-white space-x-4 px-8 py-2 ">
                <button onClick={handleUploadClick} className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400">
                  Upload
                </button>
                <button onClick={handleProcessingClick} className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400">
                  Processing Data
                </button>
                <button className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400">
                  Cancel
                </button>
              </div>
              <div className="absolute bottom-0 right-0 w-full flex flex-row justify-end bg-white  py-4 ">
              
              </div>
            </div>
          </Rnd>
          
        </div>
      )}
     
    </div>
    
  );
};

export default Create;