"use client"
import React, { useState } from 'react'
import Sidebar from '../Sidebar/page'
import Nav1 from '../navbar/page'
import { useRouter } from 'next/navigation'
import Papa from "papaparse";
const Create = () => {
    const [data, setData] = useState([]);
    const router = useRouter();
  
    // เมื่อผู้ใช้เลือกไฟล์ CSV
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = target.result;
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        setData(parsed.data);
  
        // อัปโหลดไปยัง Backend
        const formData = new FormData();
        formData.append("file", file);
  
        const res = await fetch("/api/uploadCDN", {
          method: "POST",
          body: formData,
        });
  
        const result = await res.json();
        if (res.ok) {
          // เปลี่ยนหน้าไปที่หน้าตาราง
          router.push(`/tablepage?file=${file.name}`);
        } else {
          alert(result.error || "Upload failed");
        }
      };
  
      reader.readAsText(file);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <Nav1 />
        <div className="flex ">
            <Sidebar />
            <div className="flex-1 flex-wrap relative min-h-screen bg-[#F5F5F5] ml-[5.5rem] ">
                    <h1 className="absolute top-12 left-16  text-2xl font-bold text-[#2B3A67] w-full max-w-full ">
                        Import Data
                    </h1>
                    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D9D9D]e p-4">
                        <label htmlFor="file-upload">
                            <img src="/createCSV.png" 
                                    alt="CreateCSV" 
                                    style={{ width: '300px', height: 'auto' }} 
                                    className="absolute top-28 left-16 max-w-full max-h-full object-contain " 
                                />
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                       
                    </div>

                    <h1 className="absolute top-96 left-1/3  text-2xl font-bold text-[#2B3A67] w-full max-w-full ">
                         เลือก data ลงในรายงานของคุณ
                    </h1>


            </div>
        </div>
        </div>
    );
};

export default Create;