"use client";
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import React from 'react'

function TablePage() {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("file") || "CSV Data";

  useEffect(() => {
    // โหลดข้อมูลจาก API
    const fetchData = async () => {
      const res = await fetch("/api/getData");
      const result = await res.json();
      if (res.ok) {
        setData(result.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{fileName}</h2>
      {data.length > 0 ? (
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border border-gray-300 px-2 py-1">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border border-gray-300 px-2 py-1">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
       
      ) : (
        <p>Loading...</p>
      )}
      <div>
      <ul className='list-none p-5 flex space-x-4' >
        <li >
          <Link href="/Favorites">
            <span>Loaddata</span>
          </Link>
        </li>
        <li >
          <Link href="/TransformData">
            <span>Transform Data</span>
          </Link>
        </li>
        
      </ul>
      </div>
    </div>
  )
}

export default TablePage