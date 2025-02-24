import { NextResponse } from 'next/server';
import path from 'path';
import { connectMongoDB } from "../../../../lib/mongodb"; 
import Papa from 'papaparse';
import File from '../../../../models/File';
export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileText = await file.text(); // อ่านไฟล์ CSV เป็นข้อความ
    const parsedData = Papa.parse(fileText, { header: true, skipEmptyLines: true });

    const newFile = new File({
      name: file.name, // ใช้ชื่อไฟล์ CSV เป็น name
      data: parsedData.data,
    });

    await newFile.save();

    return NextResponse.json({ message: "File uploaded successfully", fileId: newFile._id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}