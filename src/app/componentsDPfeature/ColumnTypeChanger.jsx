'use client';
import { useMainData } from '../MainDataContext/page';
import { useState } from "react";

export default function ColumnTypeChanger() {
  const { mainData, setMainData, selectedColumn } = useMainData();
  const [error, setError] = useState("");

  const typeOptions = [
    'Text',
    'Whole Number',
    'Decimal Number',
    'Percentage',
    'Date',
    'Time',
    'True/False'
  ];

  const convertValue = (value, type) => {
    if (value === null || value === undefined || value === '') return null;

    switch (type) {
      case 'Text':
        return String(value);
      case 'Whole Number': {
        const num = parseInt(value);
        if (isNaN(num)) throw new Error(`Invalid number: ${value}`);
        return num;
      }
      case 'Decimal Number': {
        const num = parseFloat(value);
        if (isNaN(num)) throw new Error(`Invalid decimal: ${value}`);
        return num;
      }
      case 'Percentage': {
        const num = parseFloat(value);
        if (isNaN(num)) throw new Error(`Invalid percent: ${value}`);
        return num / 100;
      }
      case 'Date': {
        const date = new Date(value);
        if (isNaN(date.getTime())) throw new Error(`Invalid date: ${value}`);
        return date.toISOString().split("T")[0];
      }
      case 'Time': {
        const date = new Date(`1970-01-01T${value}`);
        if (isNaN(date.getTime())) throw new Error(`Invalid time: ${value}`);
        return value;
      }
      case 'True/False': {
        const val = value.toString().toLowerCase();
        if (val === "true") return true;
        if (val === "false") return false;
        throw new Error(`Invalid boolean: ${value}`);
      }
      default:
        throw new Error("Unknown type");
    }
  };

  const handleChangeType = (type) => {
    if (!mainData || !selectedColumn) return;
    try {
      const newRows = mainData.rows.map(row => ({
        ...row,
        [selectedColumn]: convertValue(row[selectedColumn], type)
      }));

      setMainData({
        ...mainData,
        rows: newRows,
        columnTypes: {
          ...mainData.columnTypes,
          [selectedColumn]: type
        }
      });

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const currentType = mainData?.columnTypes?.[selectedColumn] || "";

  return (
    <div className="px-1 py-1 rounded hover:bg-gray-200 flex items-center">
      <select
        onChange={(e) => handleChangeType(e.target.value)}
        disabled={!selectedColumn}
        value={currentType}
        className="px-0 py-0 rounded" style={{ fontSize: "0.75rem" }}
      >
        <option value="" disabled>Change Data Type</option>
        {typeOptions.map(type => (
          <option key={type} value={type}>Data Type: {type}</option>
        ))}
      </select>

      {error && (
        <div className="text-red-500 text-sm">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

{/*<div >
                <button
                    className="px-1 py-1 rounded hover:bg-gray-200 flex items-center"
                >
                    <select className="px-0 py-0 rounded" style={{ fontSize: "0.75rem" }}>
                      <option>Data Type: Whole Numner</option>
                      <option>Data Type: Manage</option>
                    </select>
                   
                </button>
              </div>*/}
