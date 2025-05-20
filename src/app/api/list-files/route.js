// import { NextResponse } from "next/server";
// import { connectMongoDB } from "../../../../lib/mongodb";
// import File from "../../../../models/File";

// export async function GET() {
//   try {
//     await connectMongoDB();

//     const files = await File.find().select("table_name"); // ดึงเฉพาะชื่อไฟล์
//     const fileNames = files.map((file) => file.table_name); // แปลงเป็น Array ของชื่อไฟล์

//     return NextResponse.json({ files: fileNames });
//   } catch (error) {
//     console.error("Fetch Files Error:", error);
//     return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import File from "../../../../models/File";
import { connectMongoDB } from "../../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 403 });
    }

    await connectMongoDB();

    // 🔍 รับ reportId จาก query ถ้ามี
    const { searchParams } = new URL(req.url);
    const reportId = searchParams.get("reportId");

    const filter = { userId };
    if (reportId) {
      filter.reportId = reportId;
    }

    const files = await File.find(filter)
      .sort({ createdAt: -1 })
      .select("_id table_name createdAt reportId");

    return NextResponse.json({ files }, { status: 200 });

  } catch (err) {
    console.error("List Files Error:", err);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
