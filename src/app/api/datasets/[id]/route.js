import { connectMongoDB } from "../../../../../lib/mongodb";
import File from "../../../../../models/File";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongoDB();
  try {
    const dataset = await File.findById(params.id);
    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }
    return NextResponse.json({ data: dataset.data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dataset" }, { status: 500 });
  }
}