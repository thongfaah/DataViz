'use client';

import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input/page'; 
import { Select, SelectItem } from '../components/ui/select/page';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell} from '../components/ui/table/page';
import { Button } from '../components/ui/button/page';

export default function CsvTxtParser() {
  const [data, setData] = useState([]);
  const [delimiter, setDelimiter] = useState(',');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [rowsToShow, setRowsToShow] = useState(10);

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
    const savedFile = localStorage.getItem("uploadedFile");
    if (savedFile) {
      const { name, content } = JSON.parse(savedFile);
      setFileName(name);
      setFileContent(content);
    }
  }, []);
  
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
      {fileName && <h1 className="text-2xl  text-[#2B3A67] mb-4">{fileName}</h1>}
      <div className='flex flex-row space-x-4'>
        <div className='w-1/2'>
        <span>Delimiter</span>
        <Select
          onChange={(value) => {
            setDelimiter(value);
            localStorage.setItem("delimiter", value); // บันทึก delimiter
          }}
        >
          <SelectItem value=",">Comma (,)</SelectItem>
          <SelectItem value="\t">Tab (\t)</SelectItem>
          <SelectItem value=" ">Space ( )</SelectItem>
          <SelectItem value="auto">Auto Detect</SelectItem>
        </Select>
        </div>
        
      <div className='w-1/2'>
        <span>Rows</span>
          <Select onChange={(value) => setRowsToShow(Number(value))}>
          <SelectItem value="10">Show 10 rows</SelectItem>
          <SelectItem value="20">Show 20 rows</SelectItem>
        </Select>
      </div>
      
      </div>
      
      <div className="overflow-auto max-h-[500px] ">
    <Table className="min-w-full ">
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
    </div>
  );
}
