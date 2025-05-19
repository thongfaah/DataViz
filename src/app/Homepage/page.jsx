"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Sidebar from "../Sidebar/page";
import Link from "next/link";
import Nav1 from "../navbar/page";
import { Trash2 } from "lucide-react"; 

function Homepage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  // 📝 ฟังก์ชันดึงข้อมูลจาก API
  useEffect(() => {
    const fetchReports = async () => {
      if (!session) return;

      try {
        const res = await fetch("/api/getReport", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setReports(data); // ✅ เก็บข้อมูลใน State
        } else {
          console.error("Unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error.message);
      } finally {
        setLoading(false); // ✅ หยุด Loading เมื่อดึงข้อมูลเสร็จ
      }
    };

    fetchReports();
  }, [session]);

  // ฟังก์ชันจัดการเมื่อคลิกที่ Report
   const handleClick = (report) => {
    // 🕰️ บันทึกเวลาเข้าถึงล่าสุด
    const now = new Date().toLocaleString();
    localStorage.setItem(`lastAccessedAt_${report._id}`, now);

    // 🔄 Redirect ไปที่ Dashboard
    router.push(`/Dashboard?id=${report._id}`);
  };

   // 🚮 ฟังก์ชันลบ Report
 const handleDelete = async (reportId) => {
  if (confirm("คุณต้องการลบรายงานนี้หรือไม่?")) {
    try {
      const res = await fetch(`/api/getReport/${reportId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setReports(reports.filter((report) => report._id !== reportId));
        alert("ลบรายงานเรียบร้อยแล้ว");
      } else {
        const errorData = await res.json();
        alert("ไม่สามารถลบรายงานได้: " + errorData.error);
      }
    } catch (error) {
      console.error("Failed to delete report:", error.message);
    }
  }
};


  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Nav1 reports={reports}/>
      <div className="bg-[#F5F5F5] h-screen">
        <Sidebar />

        <main className="px-20 py-8 overflow-y-scroll h-full w-full">
          <h1 className="ml-20 mb-6 p-5 text-2xl font-semibold text-[#2B3A67]">
            My Reports
          </h1>

          <div className="grid grid-cols-3 gap-6 px-20">
            {/* 🌀 Loading State */}
            {loading ? (
              <p className="text-center col-span-3 text-gray-600">Loading...</p>
            ) : reports.length === 0 ? (
              <p className="text-center col-span-3 text-gray-600">
                No reports found
              </p>
            ) : (
              reports.map((report) => (
                // <Link href={`/Dashboard?id=${report._id}`} key={report._id} onClick={() => handleClick(report)}>
                //   <div className="w-60 h-60 bg-white border border-gray-300 rounded shadow-md p-4 hover:bg-gray-100 cursor-pointer">

                //     <h2 className="text-lg font-semibold text-[#2B3A67] truncate">
                //       {report.title}
                //     </h2>
           
                //     <p className="text-xs text-gray-400 mt-4">
                //       {new Date(report.createdAt).toLocaleDateString()}
                //     </p>
                //   </div>
                // </Link>
                 <div
                  key={report._id}
                  className="relative w-60 h-60 bg-white border border-gray-300 rounded shadow-md p-4 hover:bg-gray-100 cursor-pointer"
                >
                  {/* 🗑️ ปุ่มลบ */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ป้องกันไม่ให้ Click บน Card
                      handleDelete(report._id);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>

                  {/* 🔗 คลิกเพื่อไป Dashboard */}
                  <div onClick={() => handleClick(report)}>
                    <h2 className="text-lg font-semibold text-[#2B3A67] truncate">
                      {report.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-4">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* 🔘 ปุ่มสร้างรายงานใหม่ */}
            <Link
              href="/Create"
              className="flex items-center justify-center w-60 h-60 bg-white border-2 border-[#2B3A67] hover:bg-gray-100 cursor-pointer"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41 2.5V79.5M2.5 41H79.5"
                  stroke="#2B3A67"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Homepage;
