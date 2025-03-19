import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";
import Papa from "papaparse";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { fileName, fileContent, delimiter } = await req.json();

    if (!fileContent || !fileName) {
      return NextResponse.json({ error: "No file content or filename provided" }, { status: 400 });
    }

    // ✅ กำหนด delimiter ตามประเภทไฟล์
    let fileDelimiter = delimiter?.trim();
    if (!fileDelimiter) {
      fileDelimiter = fileName.endsWith(".txt") ? "\t" : ","; // TXT ใช้ tab เป็นค่าเริ่มต้น
    } else if (fileDelimiter === "space") {
      fileDelimiter = " "; // ถ้าเป็น space ต้องกำหนดให้เป็น " "
    }

    // ✅ ใช้ PapaParse ให้รองรับ delimiter ที่กำหนด
    const parsedData = Papa.parse(fileContent, {
      delimiter: fileDelimiter,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    if (parsedData.errors.length > 0) {
      console.error("CSV Parsing Error:", parsedData.errors);
      return NextResponse.json({ error: "CSV Parsing Error", details: parsedData.errors }, { status: 400 });
    }

    // ✅ ตรวจสอบและสร้าง column header หากไม่มี
    let columns = parsedData.meta.fields || [];
    if (!columns.length && parsedData.data.length > 0) {
      columns = Object.keys(parsedData.data[0]);
    }

    // ✅ เติมค่า "" หาก column ไม่ครบ
    const rows = parsedData.data.map(row => {
      return columns.reduce((obj, col) => {
        obj[col] = row[col] !== undefined ? row[col] : "";
        return obj;
      }, {});
    });

    // ✅ บันทึกลง MongoDB
    const newFile = new File({ table_name: fileName, columns, rows });
    await newFile.save();

    return NextResponse.json({ message: "File uploaded successfully", fileId: newFile._id });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
