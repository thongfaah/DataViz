import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";

export async function GET(req) {
  try {
    await connectMongoDB();
    
    const url = new URL(req.url);
    const fileName = url.searchParams.get("file");
    const delimiter = decodeURIComponent(url.searchParams.get("delimiter") || ","); // ค่าดีฟอลต์เป็น comma

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    const fileData = await File.findOne({ table_name: fileName });

    if (!fileData) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    let columns = fileData.columns;
    let rows = fileData.rows;

    // 📌 ปรับโครงสร้างข้อมูลถ้าผู้ใช้เปลี่ยนตัวคั่น
    if (delimiter !== ",") {
      columns = columns.join(delimiter).split(delimiter); 
      rows = rows.map((row) => 
        columns.map((col) => row[col] || "").join(delimiter) // แปลงเป็น string ตามตัวคั่นที่เลือก
      );
    }
    

    return NextResponse.json({ columns, rows });
  } catch (error) {
    console.error("Get Data Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
