'use client';

import { useState, useEffect } from 'react';
import { Select, SelectItem } from '../components/ui/select/page';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../components/ui/table/page';

export default function CsvTxtParser({ fileContent = '', fileName = '', delimiter = ',' }) {
  const [data, setData] = useState([]);
  const [localDelimiter, setLocalDelimiter] = useState(delimiter);
  const [rowsToShow, setRowsToShow] = useState(10);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!fileContent) return;

    let detectedDelimiter = localDelimiter;
    if (localDelimiter === 'auto') {
      if (fileContent.includes('\t')) detectedDelimiter = '\t';
      else if (fileContent.includes(',')) detectedDelimiter = ',';
      else detectedDelimiter = ' ';
    }

    let lines = fileContent.split('\n').map((line) => line.trim());
    const parsedData = lines.map((line) => line.split(detectedDelimiter));
    setData(parsedData);
  }, [fileContent, localDelimiter]);

  // const handleSaveToDB = async () => {
  //   setIsSaving(true);
  //   try {
  //     const res = await fetch('/api/upload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         fileName,
  //         fileContent,
  //         delimiter: localDelimiter,
  //       }),
  //     });

  //     const result = await res.json();
  //     if (!res.ok) throw new Error(result.error || 'Upload failed');

  //     alert('✅ Data saved to database!');
  //   } catch (error) {
  //     console.error('❌ Save error:', error);
  //     alert('Failed to save data: ' + error.message);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  const handleSaveToDB = async () => {
  setIsSaving(true);
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}` // ✅ เพิ่มตรงนี้
      },
      body: JSON.stringify({
        fileName,
        fileContent,
        delimiter: localDelimiter,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Upload failed');

    alert('✅ Data saved to database!');
  } catch (error) {
    console.error('❌ Save error:', error);
    alert('Failed to save data: ' + error.message);
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-row space-x-4">
        <div className="w-1/2">
          <span>Delimiter</span>
          <Select
            defaultValue={localDelimiter}
            onChange={(value) => {
              setLocalDelimiter(value);
              localStorage.setItem("delimiter", value);
            }}
          >
            <SelectItem value=",">Comma (,)</SelectItem>
            <SelectItem value="\t">Tab (\t)</SelectItem>
            <SelectItem value=" ">Space ( )</SelectItem>
            <SelectItem value="auto">Auto Detect</SelectItem>
          </Select>
        </div>
        <div className="w-1/2">
          <span>Rows</span>
          <Select onChange={(value) => setRowsToShow(Number(value))}>
            <SelectItem value="10">Show 10 rows</SelectItem>
            <SelectItem value="20">Show 20 rows</SelectItem>
          </Select>
        </div>
      </div>

      <div className="overflow-auto max-h-[500px] border border-gray-200 rounded-md">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              {data[0]?.map((col, index) => (
                <TableHead key={index}>{col || `Column ${index + 1}`}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(1, rowsToShow + 1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveToDB}
          disabled={isSaving}
          className={`px-4 py-2 rounded text-white ${isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSaving ? 'Saving...' : 'Save to Database'}
        </button>
      </div>
    </div>
  );
}
