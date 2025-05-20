"use client"
import React, { useState, useEffect, useRef } from 'react';
import { table } from 'arquero';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { useMainData } from '../MainDataContext/page';
const AppendModal = ({ onClose}) => {
  const { mainData } = useMainData();
  const [uploadedTables, setUploadedTables] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [mergedResult, setMergedResult] = useState(null);
  const [error, setError] = useState('');
  const { setMainData } = useMainData();
  const nodeRef = useRef(null);
  useEffect(() => {
    fetchDataFromDB();
  }, []);
  useEffect(() => {
    console.log("mainData received in AppendModal:", mainData);
  }, [mainData]);
  const fetchDataFromDB = async () => {
    try {
      const res = await fetch('/api/files');
      const json = await res.json();

      if (json.success) {
        const formattedTables = json.data.map((item, idx) => {
          const dataObj = {};
          item.columns.forEach(col => {
            dataObj[col] = item.rows.map(row => row[col]);
          });
          return {
            key: item.table_name || `data_${idx + 1}`,
            data: table(dataObj)
          };
        });
        setUploadedTables(formattedTables);
      } else {
        setError("Failed to fetch data from database.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error connecting to server.");
    }
  };
  const handleAppend = () => {
  setError('');

  if (!mainData || !mainData.columns || !mainData.rows) {
    setError('Main data is not available.');
    return;
  }

  if (selectedDatasets.length !== 1) {
    setError('Please select a dataset first.');
    return;
  }

  const selectedTable = uploadedTables.find(d => d.key === selectedDatasets[0]);

  if (!selectedTable) {
    setError('Selected dataset not found.');
    return;
  }

  try {
    const mainDataObj = {};
    mainData.columns.forEach(col => {
      mainDataObj[col] = mainData.rows.map(row => row[col]);
    });
    const mainTable = table(mainDataObj);

    const otherTable = selectedTable.data;

    const allColumns = Array.from(
      new Set([...mainTable.columnNames(), ...otherTable.columnNames()])
    );

    const alignTable = (tbl) => {
      const currentCols = tbl.columnNames();
      const missingCols = allColumns.filter(col => !currentCols.includes(col));
      const nullCols = Object.fromEntries(missingCols.map(col => [col, () => null]));
      return missingCols.length ? tbl.derive(nullCols) : tbl;
    };

    const alignedMain = alignTable(mainTable);
    const alignedOther = alignTable(otherTable);

    const result = alignedMain.concat(alignedOther);

    // ⬇️ อัพเดต mainData ที่ MainDataContext
    const newMainData = {
      table_name: mainData.table_name + ' (Appended)',
      columns: allColumns,
      rows: result.objects()
    };
    setMainData(newMainData);

    setMergedResult(result);
    onClose();

  } catch (err) {
    console.error('Append Error:', err);
    setError('Failed to append datasets. Ensure data is valid.');
  }
};
  {/*const handleAppend = async () => {
    setError('');
  
    if (!mainData || !mainData.columns || !mainData.rows) {
      setError('Main data is not available.');
      return;
    }
  
    if (selectedDatasets.length !== 1) {
      setError('Please select a dataset first.');
      return;
    }
  
    const selectedTable = uploadedTables.find(d => d.key === selectedDatasets[0]);
  
    if (!selectedTable) {
      setError('Selected dataset not found.');
      return;
    }
  
    try {
      // แปลง mainData เป็น table
      const mainDataObj = {};
      mainData.columns.forEach(col => {
        mainDataObj[col] = mainData.rows.map(row => row[col]);
      });
      const mainTable = table(mainDataObj);
      const otherTable = selectedTable.data;
  
      const allColumns = Array.from(
        new Set([...mainTable.columnNames(), ...otherTable.columnNames()])
      );
  
      const alignTable = (tbl) => {
        const currentCols = tbl.columnNames();
        const missingCols = allColumns.filter(col => !currentCols.includes(col));
        const nullCols = Object.fromEntries(missingCols.map(col => [col, () => null]));
        return missingCols.length ? tbl.derive(nullCols) : tbl;
      };
  
      const alignedMain = alignTable(mainTable);
      const alignedOther = alignTable(otherTable);
  
      const result = alignedMain.concat(alignedOther);
      setMergedResult(result);
  
      // 🔄 แปลงกลับเป็น columns + rows
      const columns = result.columnNames();
      const rows = result.objects();
  
      // ✅ เรียก API เพื่อบันทึกทับใน MongoDB
      const response = await fetch(`/api/files/${mainData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columns, rows }),
      });
  
      if (!response.ok) {
        const errData = await response.json();
        console.error("Failed to save:", errData);
        setError('Failed to save updated dataset to database.');
      } else {
        console.log("✅ Dataset updated successfully.");
        onClose();
      }
  
    } catch (err) {
      console.error('Append Error:', err);
      setError('Failed to append datasets. Ensure data is valid.');
    }
  };บันทึกลงDatabase*/}
  
  
  
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
      <Draggable handle=".modal-header" nodeRef={nodeRef}>
        <div ref={nodeRef} className="bg-white p-6 rounded shadow-lg absolute w-[90vw] max-w-[1000px] max-h-[90vh] overflow-auto">
          {/* ส่วนหัวที่ใช้ลาก */}
          <div className="modal-header cursor-move text-2xl font-semibold mb-5 relative">
          Append
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-4">

          <div>
            <label htmlFor="dataset-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select a dataset to append:
            </label>
            <select
              id="dataset-select"
              value={selectedDatasets[0] || ''}
              onChange={(e) => setSelectedDatasets([e.target.value])}
              className="border rounded px-3 py-2 w-full max-w-sm"
            >
              <option value="" disabled>Select one dataset</option>
              {uploadedTables.map(({ key }) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>


            <div className="space-x-2 flex justify-end ">
              <button
                onClick={handleAppend}
                className="bg-[#2B3A67] text-white px-7 py-1 rounded"
              >
                OK
              </button>
              <button
                onClick={onClose}
                className=" text-black border border-gray-500 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>

            {error && <div className="text-red-600 font-semibold">{error}</div>}

            {mergedResult && (
              <div className="border rounded p-4 mt-4 bg-gray-50">
                <h2 className="font-semibold mb-2">🧾 Result</h2>
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      {mergedResult.columnNames().map((col) => (
                        <th key={col} className="border px-2 py-1 bg-gray-300">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mergedResult.objects().map((row, i) => (
                      <tr key={i}>
                        {mergedResult.columnNames().map((col) => (
                          <td key={col} className="border px-2 py-1">
                            {row[col] !== undefined && row[col] !== null ? row[col] : 'null'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>,
    document.body
  );
};

export default AppendModal;
{/*const Append = () => {
  const [uploadedTables, setUploadedTables] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [mergedResult, setMergedResult] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = async () => {
    try {
      const res = await fetch('/api/files');
      const json = await res.json();

      if (json.success) {
        const formattedTables = json.data.map((item, idx) => {
          const dataObj = {};
          item.columns.forEach(col => {
            dataObj[col] = item.rows.map(row => row[col]);
          });
          return {
            key: item.table_name || `data_${idx + 1}`,
            data: table(dataObj)
          };
        });
        setUploadedTables(formattedTables);
      } else {
        setError("Failed to fetch data from database.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error connecting to server.");
    }
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.trim().split("\n").map((line) => line.split(","));
      const headers = rows[0];
      const dataRows = rows.slice(1);

      const dataObj = {};
      headers.forEach((header) => {
        dataObj[header] = [];
      });

      dataRows.forEach((row) => {
        row.forEach((value, i) => {
          const key = headers[i];
          const val = value.trim();
          dataObj[key].push(isNaN(val) ? val : Number(val));
        });
      });

      const newTable = table(dataObj);
      const newKey = `data_${uploadedTables.length + 1}`;
      setUploadedTables((prev) => [...prev, { key: newKey, data: newTable }]);
    } catch (err) {
      console.error('File parsing error:', err);
      setError('Failed to parse CSV. Ensure it is valid.');
    }
  };

  const handleColumnClick = (datasetKey) => {
    setError('');
    if (!selectedDatasets.includes(datasetKey)) {
      setSelectedDatasets((prev) => [...prev, datasetKey]);
    } else {
      setSelectedDatasets((prev) => prev.filter((d) => d !== datasetKey));
    }
  };

  const handleAppend = () => {
    setError('');
    const selectedTables = uploadedTables.filter((d) => selectedDatasets.includes(d.key));

    if (selectedTables.length >= 2) {
      try {
        const allColumns = Array.from(
          new Set(selectedTables.flatMap((d) => d.data.columnNames()))
        );

        const alignedTables = selectedTables.map(({ data }) => {
          const currentCols = data.columnNames();
          const missingCols = allColumns.filter((col) => !currentCols.includes(col));

          if (missingCols.length > 0) {
            const nullCols = Object.fromEntries(missingCols.map((col) => [col, () => null]));
            return data.derive(nullCols);
          }
          return data;
        });

        const result = alignedTables.slice(1).reduce((acc, t) => acc.concat(t), alignedTables[0]);
        setMergedResult(result);
      } catch (err) {
        console.error('Append Error:', err);
        setError('Failed to append datasets. Ensure data is valid.');
      }
    } else {
      setError('Select at least 2 datasets to append.');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">📤 Upload CSV and Merge Data</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border p-2"
      />

      <div className="grid grid-cols-2 gap-4">
        {uploadedTables.map(({ key, data }) => (
          <div key={key} className="border rounded shadow">
            <h2
              className={`text-lg p-2 font-semibold cursor-pointer ${
                selectedDatasets.includes(key) ? 'bg-blue-200' : 'bg-gray-100'
              }`}
              onClick={() => handleColumnClick(key)}
            >
              {key}
            </h2>
            <table className="table-auto w-full text-sm">
              <thead>
                <tr>
                  {data.columnNames().map((col) => (
                    <th key={col} className="border px-2 py-1 bg-gray-200">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.objects().map((row, i) => (
                  <tr key={i}>
                    {data.columnNames().map((col) => (
                      <td key={col} className="border px-2 py-1">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="space-x-2">
        <button
          onClick={handleAppend}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Append Selected
        </button>
      </div>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {mergedResult && (
        <div className="border rounded p-4 mt-4 bg-gray-50">
          <h2 className="font-semibold mb-2">🧾 Result</h2>
          <table className="table-auto w-full text-sm">
            <thead>
              <tr>
                {mergedResult.columnNames().map((col) => (
                  <th key={col} className="border px-2 py-1 bg-gray-300">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mergedResult.objects().map((row, i) => (
                <tr key={i}>
                  {mergedResult.columnNames().map((col) => (
                    <td key={col} className="border px-2 py-1">
                      {row[col] !== undefined && row[col] !== null ? row[col] : 'null'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default Append;*/}