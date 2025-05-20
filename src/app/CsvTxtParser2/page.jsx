'use client';
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Input } from '../components/ui/input/page';
import { Select, SelectItem } from '../components/ui/select/page';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '../components/ui/table/page';
import { Button } from '../components/ui/button/page';
import { useRouter } from 'next/navigation';

export default function CsvTxtParser2({
  fileContent: initialFileContent = '',
  delimiter: initialDelimiter = ',',
  fileName: initialFileName = '',
  closePopup,
}) {
  const [data, setData] = useState([]);
  const [delimiter, setDelimiter] = useState(initialDelimiter);
  const [fileContent, setFileContent] = useState(initialFileContent);
  const [fileName, setFileName] = useState(initialFileName);
  const [rowsToShow, setRowsToShow] = useState(10);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const router = useRouter();

  // ⬇️ คำนวณตำแหน่งตรงกลางหน้าจอ
  const [position, setPosition] = useState({
    x: (window.innerWidth - 800) / 2,
    y: (window.innerHeight - 600) / 2,
  });

  useEffect(() => {
    if (!fileContent) return;

    let detectedDelimiter = delimiter;
    if (delimiter === 'auto') {
      if (fileContent.includes('\t')) detectedDelimiter = '\t';
      else if (fileContent.includes(',')) detectedDelimiter = ',';
      else detectedDelimiter = ' ';
    }

    let lines = fileContent
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const parsedData = lines.map((line) => line.split(detectedDelimiter));
    setData(parsedData);

    // ⬇️ เซ็ต Popup ให้อยู่ตรงกลางเสมอเมื่อเปิดไฟล์
    setPosition({
      x: (window.innerWidth - 800) / 2,
      y: (window.innerHeight - 600) / 2,
    });

  }, [fileContent, delimiter]);

  // const handleUploadToDB = async () => {
  //   if (!fileContent || !fileName) {
  //     alert('Please upload a file first!');
  //     return;
  //   }

  //   setLoading(true);
  //   setUploadStatus('');

  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         fileName: fileName,
  //         fileContent: fileContent,
  //         delimiter: delimiter,
  //       }),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       setUploadStatus('✔️ Upload successful: ' + result.message);
  //       router.push('/Dashboard');
  //     } else {
  //       setUploadStatus('❌ Error: ' + result.error);
  //     }
  //   } catch (error) {
  //     console.error('Upload Error:', error);
  //     setUploadStatus('❌ Failed to upload data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleUploadToDB = async () => {
  if (!fileContent || !fileName) {
    alert('Please upload a file first!');
    return;
  }

  setLoading(true);
  setUploadStatus('');

  try {
    let reportId = localStorage.getItem("reportId");

    // ❗️ถ้ายังไม่มี reportId → สร้าง report ใหม่
    if (!reportId) {
      const createRes = await fetch('/api/getReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: 'Untitled Report',
          description: '',
          content: [],
        }),
      });

      const createResult = await createRes.json();
      if (!createRes.ok) throw new Error(createResult.error || "Failed to create report");

      reportId = createResult._id;
      localStorage.setItem("reportId", reportId);
    }

    // 📦 อัปโหลดไฟล์พร้อม reportId
    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        fileName,
        fileContent,
        delimiter,
        reportId, // 👈 ส่งไปผูกกับไฟล์
      }),
    });

    const uploadResult = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(uploadResult.error || "Upload failed");

    setUploadStatus('✔️ Upload successful!');
    router.push(`/Dashboard?id=${reportId}`); // ✅ ไปหน้า Dashboard พร้อม id

  } catch (error) {
    console.error("Upload error:", error.message);
    setUploadStatus('❌ ' + error.message);
  } finally {
    setLoading(false);
  }
};


//     const result = await response.json();
//     if (response.ok) {
//       setUploadStatus('✔️ Upload successful: ' + result.message);
//       router.push('/Dashboard');
//     } else {
//       setUploadStatus('❌ Error: ' + result.error);
//     }
//   } catch (error) {
//     console.error('Upload Error:', error);
//     setUploadStatus('❌ Failed to upload data');
//   } finally {
//     setLoading(false);
//   }
// };


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <Rnd
        default={{
          x: position.x,
          y: position.y,
          width: 800,
          height: 600,
        }}
        minWidth={600}
        minHeight={400}
        bounds="window"
        enableResizing={{
          top: false,
          bottom: true,
          left: true,
          right: true,
          topLeft: true,
          topRight: true,
          bottomLeft: true,
          bottomRight: true,
        }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-900 ">{fileName}</h2>
            <button onClick={closePopup} className="text-gray-500 font-bold">
              ✕
            </button>
          </div>

          {/* 🔹 Delimiter Selector */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-row">
              <label htmlFor="delimiter" className="text-gray-700">
              Delimiter
            </label>
            <Select
              onChange={(value) => setDelimiter(value)}
              className="w-[800px]"
              defaultValue={delimiter}
            >
              <SelectItem value=",">Comma (,)</SelectItem>
              <SelectItem value="\t">Tab (\t)</SelectItem>
              <SelectItem value=" ">Space ( )</SelectItem>
              <SelectItem value="auto">Auto Detect</SelectItem>
            </Select>
            </div>
            <div>
              <label htmlFor="delimiter" className="text-gray-700 ">
              Rows to show
            </label>
              <Select
              onChange={(value) => setRowsToShow(Number(value))}
              className="w-40"
            >
              <SelectItem value="10">Show 10 rows</SelectItem>
              <SelectItem value="20">Show 20 rows</SelectItem>
              <SelectItem value="50">Show 50 rows</SelectItem>
            </Select>
            </div>
            
          </div>

          {/* 🔹 Data Table พร้อม Scrollbar */}
          <div className="flex-1 max-h-[400px] overflow-auto rounded border border-gray-600">
            {data.length > 0 ? (
              <Table className="w-200">
                <TableHeader>
                  <TableRow>
                    {data[0]?.map((col, index) => (
                      <TableHead key={index}>
                        {col || `Column ${index + 1}`}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <TableCell key={colIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center text-gray-400 p-10">
                No data loaded.
              </div>
            )}
          </div>

          {/* 🔹 Footer Button */}
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={handleUploadToDB} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload to Database'}
            </Button>
            <Button onClick={() => router.push('/DataProcessing')}>
              Processing Data
            </Button>
            <Button onClick={closePopup}>Cancel</Button>
          </div>

          {/* 🔹 Status Message */}
          {uploadStatus && (
            <div
              className={`mt-2 ${
                uploadStatus.includes('✔️')
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </div>
      </Rnd>
    </div>
  );
}





{/* Popup ส่วนแสดงผล */}
      {/*{showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Rnd
            size={isFullScreen ? { width: "100%", height: "100%" } : size}
            position={isFullScreen ? { x: 0, y: 0 } : position}
            onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, newPosition) => {
              setSize({
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
              });
              setPosition({
                x: Math.max(0, newPosition.x),
                y: Math.max(0, newPosition.y),
              });
            }}
            enableResizing={{
              top: true, right: true, bottom: true, left: true,
              topRight: true, topLeft: true, bottomRight: true, bottomLeft: true,
            }}
            minWidth={500}
            minHeight={500}
            className="bg-white rounded shadow-lg border-2 border-[#2B3A67] rnd-container"
          >
            <div className="relative h-full">
              <button onClick={() => { setShowPopup(false); centerPopup(); }} className="absolute top-2 right-2 text-gray-500">
                ╳
              </button>
              <button onClick={toggleFullScreen} className="absolute text-2xl text-gray-500 top-1 right-10">
                {isFullScreen ? "🗗" : "▢"}
              </button>
              <CsvTxtParser2 fileContent={fileContent} delimiter={delimiter} />
            </div>
          </Rnd>
        </div>
)}*/}