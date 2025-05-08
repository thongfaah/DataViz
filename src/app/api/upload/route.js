import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";


export async function POST(req) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectMongoDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName");

    if (!file || !fileName) {
      return NextResponse.json({ error: "No file or filename provided" }, { status: 400 });
    }

    const fileText = await file.text();

    // ตรวจสอบว่าเป็น .csv หรือ .txt
    const isCSV = fileName.toLowerCase().endsWith(".csv");
    const isTXT = fileName.toLowerCase().endsWith(".txt");

    if (!isCSV && !isTXT) {
      return NextResponse.json({ error: "Invalid file format. Only CSV and TXT are allowed." }, { status: 400 });
    }

    let columns = [];
    let rows = [];

    const lines = fileText.trim().split("\n"); // แยกแต่ละบรรทัด
    if (lines.length > 1) {
      // 🔥 รองรับทั้ง space และ comma
      const detectDelimiter = (line) => (line.includes(",") ? "," : /\s+/);
      
      // ใช้บรรทัดแรกเพื่อกำหนด delimiter (สมมติว่าทั้งไฟล์ใช้ delimiter เดียวกัน)
      const delimiter = detectDelimiter(lines[0]);
      columns = lines[0].trim().split(delimiter); 

      rows = lines.slice(1).map((line) => {
        const values = line.trim().split(delimiter); // แยกข้อมูลตาม delimiter
        return columns.reduce((obj, col, index) => {
          obj[col] = values[index] || ""; // ใส่ค่าให้แต่ละคอลัมน์
          return obj;
        }, {});
      });
    }

    if (columns.length === 0 || rows.length === 0) {
      return NextResponse.json({ error: "File is empty or improperly formatted" }, { status: 400 });
    }

    const newFile = new File({
      // userId: session.user.id, 
      table_name: fileName,
      columns: columns,
      rows: rows,
    });

    await newFile.save();

    return NextResponse.json({ message: "File uploaded successfully", fileId: newFile._id });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
