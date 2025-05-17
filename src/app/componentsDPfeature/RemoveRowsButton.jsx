'use client';
import { useMainData } from '../MainDataContext/page';
import React, { useState} from "react";
export default function RemoveRowsButton() {
  const { mainData, setMainData } = useMainData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };
  const removeTopRows = (count = 1) => {
    if (!mainData) return;
    setMainData({
      ...mainData,
      rows: mainData.rows.slice(count)
    });
  };

  const removeBottomRows = (count = 1) => {
    if (!mainData) return;
    setMainData({
      ...mainData,
      rows: mainData.rows.slice(0, -count)
    });
  };

  const removeAlternateRows = () => {
    if (!mainData) return;
    setMainData({
      ...mainData,
      rows: mainData.rows.filter((_, idx) => idx % 2 === 0)
    });
  };

  const removeDuplicateRows = () => {
    if (!mainData) return;
    const unique = [];
    const seen = new Set();
    for (const row of mainData.rows) {
      const key = JSON.stringify(row);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(row);
      }
    }
    setMainData({ ...mainData, rows: unique });
  };

  const removeBlankRows = () => {
    if (!mainData) return;
    const filtered = mainData.rows.filter(row =>
      Object.values(row).some(val => val !== null && val !== '' && val !== undefined)
    );
    setMainData({ ...mainData, rows: filtered });
  };

  const removeErrorRows = () => {
    if (!mainData) return;
    const filtered = mainData.rows.filter(row =>
      Object.values(row).every(val => val !== undefined && val !== null && val !== 'NaN')
    );
    setMainData({ ...mainData, rows: filtered });
  };

  return (
    <div >
        <button
            className={`btn flex flex-col items-center ${isDropdownOpen === "KeepRows-file" ? "bg-gray-200" : ""}`}
            onClick={() => toggleDropdown("KeepRows-file")}
        >
            <img src="/KeepRows.png" alt="KeepRows" width={35} height={35} />
            <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Remove</span>
            <span className="block" style={{ fontSize: "0.75rem" }}>Rows▾</span>
        </button>
        {isDropdownOpen === "KeepRows-file" && (
            <ul className="absolute z-10 mt-1 bg-white border shadow rounded w-48 text-sm">
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => removeTopRows(1)}>Remove Top Rows</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => removeBottomRows(1)}>Remove Bottom Rows</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeAlternateRows}>Remove Alternate Rows</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeDuplicateRows}>Remove Duplicates</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeBlankRows}>Remove Blank Rows</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeErrorRows}>Remove Errors</li>
            </ul>
        )}
    </div>
  );
}

{/*<div className="relative inline-block" ref={KeepRowsRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "KeepRows-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("KeepRows-file")}
                >
                    <img src="/KeepRows.png" alt="KeepRows" width={35} height={35} />
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Keep</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Rows▾</span>
                </button>
                {isDropdownOpen === "KeepRows-file" && (
                    <ul className="absolute z-10 mt-1 bg-white border shadow rounded w-48 text-sm">
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => removeTopRows(1)}>Remove Top Rows</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => removeBottomRows(1)}>Remove Bottom Rows</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeAlternateRows}>Remove Alternate Rows</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeDuplicateRows}>Remove Duplicates</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeBlankRows}>Remove Blank Rows</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={removeErrorRows}>Remove Errors</li>
                    </ul>
                )}
            </div>*/}
