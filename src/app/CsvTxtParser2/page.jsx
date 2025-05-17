'use client';

import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input/page';
import { Select, SelectItem } from '../components/ui/select/page';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../components/ui/table/page';
import { Button } from '../components/ui/button/page';
import { useRouter } from "next/navigation";

export default function CsvTxtParser2({ fileContent: initialFileContent = '', delimiter: initialDelimiter = ',' }) {
  const [data, setData] = useState([]);
  const [delimiter, setDelimiter] = useState(initialDelimiter);
  const [fileContent, setFileContent] = useState(initialFileContent);
  const [fileName, setFileName] = useState('');
  const [rowsToShow, setRowsToShow] = useState(10);
  const router = useRouter();

  const handleProcessingClick = () => {
    router.push('/DataProcessing');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setFileContent(text);
    };
    reader.readAsText(file);
  };

  // 🔥 useEffect ตัวนี้ จะทำงานทันทีเมื่อ fileContent เปลี่ยน (รวมทั้งตอนเปิดหน้ามาเลย)
  useEffect(() => {
  if (!fileContent) return; // ถ้าไม่มีไฟล์ ก็ไม่ต้องทำอะไร

  console.log("Raw File Content:", fileContent); // 🔍 ตรวจสอบเนื้อหาไฟล์ที่อ่านได้
  console.log("File Type Detected:", delimiter); // 🔍 ตรวจสอบ Delimiter ที่ใช้
  
  let detectedDelimiter = delimiter;
  if (delimiter === 'auto') {
    if (fileContent.includes('\t')) detectedDelimiter = '\t';
    else if (fileContent.includes(',')) detectedDelimiter = ',';
    else detectedDelimiter = ' ';
  }

  console.log("Detected Delimiter:", detectedDelimiter); // 🔍 ตรวจสอบ delimiter ที่ detect ได้

  let lines = fileContent.split('\n').map((line) => line.trim()).filter(line => line.length > 0); // ลบบรรทัดว่าง
  console.log("Lines Parsed:", lines); // 🔍 ตรวจสอบแต่ละบรรทัดที่แยกออกมาได้

  const parsedData = lines.map((line) => line.split(detectedDelimiter));
  console.log("Parsed Data:", parsedData); // 🔍 ตรวจสอบข้อมูลที่แยกเป็น Array
  
  setData(parsedData);
}, [fileContent, delimiter]);


  const handleUploadToDB = async () => {
    if (!fileContent || !fileName) {
      alert('Please upload a file first!');
      return;
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fileName,
          fileContent: fileContent,
          delimiter: delimiter
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Upload successful: ' + result.message);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload data');
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap gap-4">
        <Input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="flex-1" />
        <Select onChange={(value) => setDelimiter(value)} className="w-40" defaultValue={delimiter}>
          <SelectItem value=",">Comma (,)</SelectItem>
          <SelectItem value="\t">Tab (\t)</SelectItem>
          <SelectItem value=" ">Space ( )</SelectItem>
          <SelectItem value="auto">Auto Detect</SelectItem>
        </Select>
        <Select onChange={(value) => setRowsToShow(Number(value))} className="w-40">
          <SelectItem value="10">Show 10 rows</SelectItem>
          <SelectItem value="20">Show 20 rows</SelectItem>
        </Select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto rounded border border-gray-600">
        {data.length > 0 ? (
          <Table className="w-full">
            <TableHeader>
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
        ) : (
          <div className="text-center text-gray-400 p-10">No data loaded.</div>
        )}
      </div>

      {/* Footer Button */}
      <div className="flex justify-end gap-4">
        <Button onClick={handleUploadToDB}>Upload</Button>
        <Button onClick={handleProcessingClick}>Processing Data</Button>
        <Button onClick={() => router.back()}>Cancel</Button>
      </div>
    </div>
  );
}
