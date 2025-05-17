'use client';
import { useState } from 'react';
import Papa from 'papaparse';

export default function CSVEditor() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setColumns(Object.keys(results.data[0]));
        setSelectedColumn(null); // reset selection
      }
    });
  };

  const handleDeleteSelectedColumn = () => {
    if (!selectedColumn) return;
    const newColumns = columns.filter(col => col !== selectedColumn);
    const newData = csvData.map(row => {
      const { [selectedColumn]: _, ...rest } = row;
      return rest;
    });
    setColumns(newColumns);
    setCsvData(newData);
    setSelectedColumn(null);
  };

  const handleSelectColumn = (col) => {
    setSelectedColumn(col === selectedColumn ? null : col); // toggle selection
  };

  return (
    <div style={{ padding: '1rem' }}>
      <input type="file" accept=".csv" onChange={handleUpload} />
      {csvData.length > 0 && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={handleDeleteSelectedColumn}
              disabled={!selectedColumn}
            >
              ลบคอลัมน์ 
            </button>
          </div>

          <table border="1" cellPadding="5" style={{ marginTop: '1rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {columns.map(col => (
                  <th
                    key={col}
                    onClick={() => handleSelectColumn(col)}
                    style={{
                      backgroundColor: selectedColumn === col ? '#ffcccc' : '#f2f2f2',
                      cursor: 'pointer'
                    }}
                    title="คลิกเพื่อเลือกคอลัมน์นี้"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map(col => (
                    <td
                      key={col}
                      style={{
                        backgroundColor: selectedColumn === col ? '#ffe6e6' : 'white'
                      }}
                    >
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
