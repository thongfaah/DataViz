'use client';

import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input/page'; 
import { Select, SelectItem } from '../components/ui/select/page';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell} from '../components/ui/table/page';
import { Button } from '../components/ui/button/page';
import { useRouter } from "next/navigation";

export default function CsvTxtParser2() {
  const [data, setData] = useState([]);
  const [delimiter, setDelimiter] = useState(',');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [rowsToShow, setRowsToShow] = useState(10); // ✅ เพิ่ม state นี้
  const router = useRouter();
  const handleProcessingClick = () => {
    router.push('/DataProcessing'); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
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

  useEffect(() => {
    if (!fileContent) return;

    let detectedDelimiter = delimiter;
    if (delimiter === 'auto') {
      if (fileContent.includes('\t')) detectedDelimiter = '\t';
      else if (fileContent.includes(',')) detectedDelimiter = ',';
      else detectedDelimiter = ' ';
    }

    let lines = fileContent.split('\n').map((line) => line.trim());
    const parsedData = lines.map((line) => line.split(detectedDelimiter));

    setData(parsedData);
  }, [delimiter, fileContent]);

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

  useEffect(() => {
    const savedFile = localStorage.getItem("uploadedFile");
    if (savedFile) {
      const { name, content } = JSON.parse(savedFile);
      setFileName(name);
      setFileContent(content);
    }
  }, []);

  return (
    <div className="p-4 space-y-4">
      <Input type="file" accept=".csv,.txt" onChange={handleFileUpload} />
      
      <Select onChange={(value) => setDelimiter(value)}>
        <SelectItem value=",">Comma (,)</SelectItem>
        <SelectItem value="\t">Tab (\t)</SelectItem>
        <SelectItem value=" ">Space ( )</SelectItem>
        <SelectItem value="auto">Auto Detect</SelectItem>
      </Select>

      {/* ✅ Dropdown เลือกจำนวนแถว */}
      <Select onChange={(value) => setRowsToShow(Number(value))}>
        <SelectItem value="10">Show 10 rows</SelectItem>
        <SelectItem value="20">Show 20 rows</SelectItem>
      </Select>
      <button onClick={handleProcessingClick} className="border-2 text-gray-900 px-4 text-sm hover:bg-gray-400">
                  Processing Data
      </button>
      <Button onClick={handleUploadToDB} className="bg-blue-500 text-white">Upload to Database</Button>

      <Table>
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
    </div>
  );
}
