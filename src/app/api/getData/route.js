import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";

export async function GET() {
  try {
    await connectMongoDB();
    const fileData = await File.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด

    if (!fileData) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json({ data: fileData.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}