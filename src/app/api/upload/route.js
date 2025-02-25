import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Papa from "papaparse";
import File from "../../../../models/File";

export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName"); // 📌 รับชื่อไฟล์จาก formData

    if (!file || !fileName) {
      return NextResponse.json({ error: "No file or filename provided" }, { status: 400 });
    }

    const fileText = await file.text();
    const parsedData = Papa.parse(fileText, { header: true, skipEmptyLines: true });

    if (!parsedData.data || parsedData.data.length === 0) {
      return NextResponse.json({ error: "CSV file is empty" }, { status: 400 });
    }

    const columns = parsedData.meta.fields || [];
    const rows = parsedData.data;

    const newFile = new File({
      table_name: fileName, // ✅ ใช้ชื่อไฟล์เป็น table_name
      columns: columns, // ✅ เก็บคอลัมน์ทั้งหมด
      rows: rows, // ✅ เก็บข้อมูลในรูปแบบ Array of Objects
    });

    await newFile.save();

    return NextResponse.json({ message: "File uploaded successfully", fileId: newFile._id });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

