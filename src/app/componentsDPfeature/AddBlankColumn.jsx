import { useState } from 'react';
import { useMainData } from '../MainDataContext/page';
import { Rnd } from 'react-rnd';

export default function AddColumnModal({ isOpen, onClose, onConfirm }) {
  const { mainData } = useMainData();
  const [columnName, setColumnName] = useState("");
  const [columnData, setColumnData] = useState(Array(mainData?.rows.length).fill(""));

  if (!isOpen) return null;

  const handleInputChange = (index, value) => {
    const newData = [...columnData];
    newData[index] = value;
    setColumnData(newData);
  };

  const handleConfirm = () => {
    if (columnName.trim() === "") {
      alert("กรุณาระบุชื่อ Column");
      return;
    }
    onConfirm(columnName, columnData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-70  flex justify-center items-center z-50">
      <Rnd
        default={{
          x: window.innerWidth / 3,
          y: window.innerHeight / 4,
          width: 500,
          height: "auto",
        }}
        bounds="window"
        enableResizing={false}
        className="bg-white shadow-lg rounded-lg border border-gray-300"
      >
        <div className="p-4">
          <h2 className="text-xl mb-2 cursor-move">Add New Column</h2>

          <input
            type="text"
            placeholder="Column Name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />

          <div className="overflow-y-auto max-h-60">
            {mainData?.rows.map((_, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Row ${index + 1}`}
                value={columnData[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full p-2 mb-1 border rounded"
              />
            ))}
          </div>

          <div className="flex justify-end mt-4 gap-2">
          <button onClick={handleConfirm} className="px-7 py-1 bg-[#2B3A67] text-white text-sm rounded">
              OK
            </button>
            <button onClick={onClose} className="px-4 py-1 bg-gray-300 text-sm rounded">
              Cancel
            </button>
          </div>
        </div>
      </Rnd>
    </div>
  );
}
