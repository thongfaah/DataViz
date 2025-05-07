'use client';
import { useState } from 'react';
import { useMainData } from '../MainDataContext/page';
import { Rnd } from 'react-rnd';

export default function AddColumnModal({ isOpen, onClose }) {
  const { mainData, setMainData } = useMainData();
  const [columnName, setColumnName] = useState("");
  const [formula, setFormula] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [error, setError] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  // ✨ Handle Add Column
  const handleAddColumn = () => {
    if (!columnName) {
      setError("⚠️ Column name is required");
      return;
    }

    const newRows = mainData.rows.map((row, index) => {
      let newValue = defaultValue;
      
      if (formula) {
        try {
          const formulaFunction = new Function("row", `return ${formula};`);
          newValue = formulaFunction(row);
        } catch (err) {
          console.error("Formula Error:", err.message);
          setError("⚠️ Invalid formula syntax");
          return;
        }
      }
      
      return { ...row, [columnName]: newValue };
    });

    setMainData({
      ...mainData,
      columns: [...mainData.columns, columnName],
      rows: newRows
    });

    setError("");
    setColumnName("");
    setFormula("");
    setDefaultValue("");
    onClose();
  };

  // ✨ Insert column name to formula in `row["columnName"]` format
  const handleInsertColumn = () => {
    if (!selectedColumn) return;
    const cursorPosition = formula.length;
    const formattedColumn = `row["${selectedColumn}"]`;
    setFormula((prev) => prev.slice(0, cursorPosition) + formattedColumn + prev.slice(cursorPosition));
  };

  return isOpen ? (
    <>
      {/* ✨ Backdrop สีเทาเข้ม */}
      <div className="fixed inset-0 bg-gray-200 bg-opacity-70 z-40"></div>

      {/* ✨ Rnd Popup */}
      <Rnd
        default={{
            x: window.innerWidth / 2 - 300, // 300 คือครึ่งหนึ่งของความกว้าง
            y: window.innerHeight / 2 - 250, // 250 คือครึ่งหนึ่งของความสูง
            width: 600,
            height: 'auto'
        }}
        bounds="window"
        enableResizing={false}
        className="shadow-lg border bg-white  z-50"
        >
        <div className="p-5 w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">Custom Column</h2>
            <button onClick={onClose} className="px-2 py-1 text-black rounded">
              ✕
            </button>
          </div>

          {/* Left Side */}
          <div className="flex gap-5">
            <div className="flex flex-col w-2/3">
              {error && <p className="text-red-500 mb-2">{error}</p>}
              
              <input
                type="text"
                placeholder="Column Name"
                className="w-full p-2 mb-3 border"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              />

              <textarea
                placeholder='Formula (e.g., row["price"] * row["quantity"])'
                className="w-full p-2 mb-3 border h-24"
                value={formula}
                onChange={(e) => {
                  setFormula(e.target.value);
                }}
              />

              <input
                type="text"
                placeholder="Default Value (Optional)"
                className="w-full p-2 mb-3 border"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
              />

              <div className="flex justify-end gap-2">
                <button onClick={handleAddColumn} className="px-7 py-1 bg-[#2B3A67] text-white text-sm rounded">OK</button>
                <button onClick={onClose} className="px-4 py-1 bg-gray-300 text-sm rounded">Cancel</button>
              </div>
            </div>

            {/* Right Side - Available Columns */}
            <div className="flex flex-col w-1/3 mt-5">
              <h3 className=" mb-2">Available Columns</h3>
              <ul className="overflow-auto border  max-h-56">
                {mainData.columns.map((col, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedColumn(col)}
                    className={`p-2 cursor-pointer text-sm ${selectedColumn === col ? 'bg-gray-200 text-sm' : 'hover:bg-gray-100'}`}
                  >
                    {col}
                  </li>
                ))}
              </ul>
              <button
                className=" w-full mt-2 text-black text-sm border-2 rounded"
                onClick={handleInsertColumn}
                disabled={!selectedColumn}
              >
                &lt;&lt; Insert
              </button>
            </div>
          </div>
        </div>
      </Rnd>
    </>
  ) : null;
}
