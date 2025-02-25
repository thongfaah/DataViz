"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/page";
import Nav1 from "../navbar/page";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      alert("✅ อัปโหลดไฟล์สำเร็จ!");
      router.push(`/tablepage?file=${file.name}`);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ อัปโหลดไฟล์ล้มเหลว!");
    } finally {
      setLoading(false);
    }
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
            <label htmlFor="file-upload">
              <img
                src="/createCSV.png"
                alt="CreateCSV"
                style={{ width: "300px", height: "auto" }}
                className="absolute top-28 left-16 max-w-full max-h-full object-contain"
              />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".csv" 
              onChange={handleFileChange}
            />
            {loading && <p className="text-red-500 mt-4">Uploading...</p>}
          </div>
          <h1 className="absolute top-96 left-1/3 text-2xl font-bold text-[#2B3A67]">
            เลือก data ลงในรายงานของคุณ
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Create;

