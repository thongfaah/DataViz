'use client';
import { useMainData } from '../MainDataContext/page';
import { useState } from "react";

export default function ColumnFormatMenu() {
  const { mainData, setMainData, selectedColumn } = useMainData();
  const [error, setError] = useState("");

  const formatOptions = [
    { label: 'lowercase', action: (val) => val.toLowerCase() },
    { label: 'UPPERCASE', action: (val) => val.toUpperCase() },
    { label: 'Capitalize Each Word', action: (val) => val.replace(/\b\w/g, c => c.toUpperCase()) },
    { label: 'Trim', action: (val) => val.trim() },
    { label: 'Clean', action: (val) => val.replace(/\s+/g, ' ').trim() }
  ];

  const handleFormatChange = (format) => {
    if (!mainData || !selectedColumn) {
      setError("กรุณาเลือกคอลัมน์ที่ต้องการจัดการ");
      return;
    }

    try {
      const formattedRows = mainData.rows.map(row => ({
        ...row,
        [selectedColumn]: row[selectedColumn] ? format.action(String(row[selectedColumn])) : row[selectedColumn]
      }));

      setMainData({
        ...mainData,
        rows: formattedRows
      });

      setError("");
    } catch (err) {
      console.error(err.message);
      setError("ไม่สามารถจัดการข้อมูลในคอลัมน์นี้ได้");
    }
  };

  return (
    <div className="relative inline-block">
      <details className="dropdown">
        <summary className="btn flex flex-col items-center">
        <img src="/Format.png" alt="Format" width={37} height={37} />
        <span className="block" style={{ fontSize: "0.75rem" }}>Format▾</span>
        </summary>
        <ul className="absolute z-10 mt-1 bg-white border shadow rounded w-48 text-sm">
          {formatOptions.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleFormatChange(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </details>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

{/*<div className="relative inline-block" ref={FormatRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "Format-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("Format-file")}
                >
                    <img src="/Format.png" alt="Format" width={37} height={37} />
                    <span className="block" style={{ fontSize: "0.75rem" }}>Format▾</span>
                </button>
                {isDropdownOpen === "Format-file" && (
                    <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                    <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                        </svg>
                        square
                    </li>
                    <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                        circle
                    </li>
                    </ul>
                )}
            </div>*/}