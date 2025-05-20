"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/page";
import Nav1 from "../navbar/page";
import CsvTxtParser2 from "../CsvTxtParser2/page";
import { useFileContext } from "../FileContext/page";
import { useRouter } from "next/navigation";
import { Rnd } from "react-rnd";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [fileName, setFileName] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [fileContent, setFileContent] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [size, setSize] = useState({ width: 1000, height: 700 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const router = useRouter();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setFileContent(text);
      setDelimiter("auto");
      setShowPopup(true); // เปิด Popup
    };
    reader.readAsText(file);
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      centerPopup();
    } else {
      setPosition({ x: 0, y: 0 });
    }
    setIsFullScreen(!isFullScreen);
  };

  const centerPopup = () => {
    if (typeof window !== "undefined") {
      setPosition({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
      });
    }
  };

  const keepPopupInViewport = () => {
    if (typeof window !== "undefined") {
      setPosition((prev) => ({
        x: Math.min(Math.max(prev.x, 0), window.innerWidth - size.width),
        y: Math.min(Math.max(prev.y, 0), window.innerHeight - size.height),
      }));
    }
  };

  useEffect(() => {
    centerPopup();
  }, [size]);

  useEffect(() => {
    if (!isFullScreen) {
      keepPopupInViewport();
    }
  }, [size, isFullScreen]);

  const closePopup = () => {
    setShowPopup(false);
  };

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
              onChange={handleFileUpload}
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
              onChange={handleFileUpload}
            />
            {loading && <p className="text-red-500 mt-4">Uploading...</p>}
          </div>

          <h1 className="absolute top-96 left-1/3 text-2xl font-bold text-[#2B3A67]">
            เลือก data ลงในรายงานของคุณ
          </h1>

          {/** Render Popup */}
          {showPopup && (
            <CsvTxtParser2
              fileName={fileName}
              fileContent={fileContent}
              delimiter={delimiter}
              closePopup={closePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;






{/*const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setFileName(file.name);
    setShowPopup(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target.result;

      if (text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
      }

      let detectedDelimiter = ",";
      if (file.name.endsWith(".txt")) {
        detectedDelimiter = "\t";
      }

      setFileContent(text);
      setDelimiter(detectedDelimiter);

      // ไม่ต้องเก็บใน localStorage แล้ว
    };

    reader.readAsText(file, "UTF-8");
  };
  */}
{/* Popup ส่วนแสดงผล */}
      {/*{showPopup && (
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
              setPosition({
                x: Math.max(0, newPosition.x),
                y: Math.max(0, newPosition.y),
              });
            }}
            enableResizing={{
              top: true, right: true, bottom: true, left: true,
              topRight: true, topLeft: true, bottomRight: true, bottomLeft: true,
            }}
            minWidth={500}
            minHeight={500}
            className="bg-white rounded shadow-lg border-2 border-[#2B3A67] rnd-container"
          >
            <div className="relative h-full">
              <button onClick={() => { setShowPopup(false); centerPopup(); }} className="absolute top-2 right-2 text-gray-500">
                ╳
              </button>
              <button onClick={toggleFullScreen} className="absolute text-2xl text-gray-500 top-1 right-10">
                {isFullScreen ? "🗗" : "▢"}
              </button>
              <CsvTxtParser2 fileContent={fileContent} delimiter={delimiter} />
            </div>
          </Rnd>
        </div>
)}*/}