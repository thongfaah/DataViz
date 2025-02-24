import File from "../../../../models/File";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";



export async function GET() {
  try {
    await connectMongoDB ();  
    const datasets = await File.find({}, "-__v"); // ดึงข้อมูลทุกฟิลด์ ยกเว้น __v
    return NextResponse.json({ datasets });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch datasets" }, { status: 500 });
  }
}