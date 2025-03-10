"use client";
import React, { useEffect, useState } from "react";

const TablePage = ({ fileName }) => {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fileName) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/get-data?file=${fileName}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to fetch data");
        }

        setData({ columns: result.columns, rows: result.rows });
      } catch (error) {
        console.error("Fetch Data Error:", error);
        alert("❌ โหลดข้อมูลล้มเหลว!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fileName]);

  return (
    <div className="p-8">
      <h1 className="text-2xl  text-[#2B3A67] mb-4">{fileName}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto max-h-full"> {/* เพิ่ม div ครอบตาราง */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {data.columns.map((col, index) => (
                  <th key={index} className="border border-gray-300 p-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {data.columns.map((col, colIndex) => (
                    <td key={colIndex} className="border border-gray-300 p-2">{row[col] || "-"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablePage;