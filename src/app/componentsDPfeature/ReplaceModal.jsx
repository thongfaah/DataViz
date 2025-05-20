"use client";
import { useMainData } from "../MainDataContext/page";
import { useState } from "react";

export default function ReplaceModal({ onClose }) {
  const { mainData, setMainData, selectedColumn } = useMainData();
  const [valueToFind, setValueToFind] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const [error, setError] = useState("");

  if (!mainData || !selectedColumn) return null;

  // ดึงชนิดข้อมูลของคอลัมน์ เช่น 'Whole Number', 'Text', ฯลฯ
  const getColumnDataType = () => {
    return mainData?.columnTypes?.[selectedColumn] || "Text";
  };

  // แปลงค่าตามชนิดข้อมูล
  const parseValue = (value, type) => {
  if (value === null || value.trim().toLowerCase() === "null" || value === "") return null;

  switch (type) {
    case "Whole Number":
      return Number.isInteger(Number(value)) ? Number(value) : NaN;
    case "Decimal Number":
      return !isNaN(value) ? Number(value) : NaN;
    case "Boolean":
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
      return "invalid";
    case "Date":
      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? "invalid" : parsed.toISOString();
    case "Text":
    default:
      return value;
  }
};

  // ตรวจสอบความถูกต้องของชนิดข้อมูล
  const isTypeValid = (value, type) => {
    if (value === null || value === "null" || value === "") return true;
    const parsed = parseValue(value, type);
    return parsed !== "invalid" && !Number.isNaN(parsed);
  };

  const normalizeNull = (v) => {
  return v === null || v === undefined || v === "" ? null : v;
};

const isEqual = (a, b) => {
  const v1 = normalizeNull(a);
  const v2 = normalizeNull(b);

  if (v1 === null && v2 === null) return true;

  if (typeof v1 === "number" && typeof v2 === "number") return v1 === v2;
  if (typeof v1 === "boolean" && typeof v2 === "boolean") return v1 === v2;
  if (typeof v1 === "string" && typeof v2 === "string") return v1 === v2;

  if (v1 instanceof Date && v2 instanceof Date) return v1.getTime() === v2.getTime();

  return String(v1) === String(v2);
};

  const handleReplace = () => {
    const columnType = getColumnDataType();

    if (!isTypeValid(valueToFind, columnType) || !isTypeValid(replaceWith, columnType)) {
      setError(`Type mismatch: Expected ${columnType}`);
      return;
    }

    const parsedFindValue = parseValue(valueToFind, columnType);
    const parsedReplaceValue = parseValue(replaceWith, columnType);

    const updatedRows = mainData.rows.map((row) => ({
      ...row,
      [selectedColumn]: isEqual(row[selectedColumn], parsedFindValue)
        ? parsedReplaceValue
        : row[selectedColumn],
    }));

    setMainData({ ...mainData, rows: updatedRows });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[800px]">
        <div className="modal-header cursor-move text-2xl font-semibold mb-5 relative">
          Append
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-600"
            >
              ✕
            </button>
          </div>

        <div className="space-y-3">
          <div className="flex flex-col">
            <label className="text-sm  text-gray-900">Value To Find</label>
            <input
              className="border-gray-500 border p-1 w-1/2 rounded"
              value={valueToFind}
              onChange={(e) => setValueToFind(e.target.value)}
              
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm  text-gray-900">Replace With</label>
            <input
              className="border-gray-500 border p-1 w-1/2 rounded"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
             
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleReplace}
              className="bg-[#2B3A67] text-white px-7 py-1 rounded"
            >
              OK
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
