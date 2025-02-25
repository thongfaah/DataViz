import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";

export async function GET() {
  try {
    await connectMongoDB();

    const files = await File.find().select("table_name"); // ดึงเฉพาะชื่อไฟล์
    const fileNames = files.map((file) => file.table_name); // แปลงเป็น Array ของชื่อไฟล์

    return NextResponse.json({ files: fileNames });
  } catch (error) {
    console.error("Fetch Files Error:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
