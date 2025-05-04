// app/api/files/route.js (หรือ pages/api/files.js)
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";

export async function GET(req) {
  try {
    await connectMongoDB();
    const files = await File.find({});
    return Response.json({ success: true, data: files });
  } catch (error) {
    console.error("Fetch error:", error);
    return Response.json({ success: false, message: "Failed to fetch files" }, { status: 500 });
  }
}
