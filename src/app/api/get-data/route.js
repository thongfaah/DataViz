import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";

export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("file"); // 📌 รับชื่อไฟล์จาก query parameter

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    const fileData = await File.findOne({ table_name: fileName });

    if (!fileData) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ columns: fileData.columns, rows: fileData.rows });
  } catch (error) {
    console.error("Fetch Data Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}


