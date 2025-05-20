// import { NextResponse } from "next/server";
// import { connectMongoDB } from "../../../../lib/mongodb";
// import File from "../../../../models/File";
// import jwt from "jsonwebtoken";


// export async function POST(req) {
//   try {
//     // const session = await getServerSession(authOptions);
//     // if (!session) {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     // }

//     await connectMongoDB();

//     const { fileName, fileContent, delimiter } = await req.json();

//     if (!fileContent || !fileName) {
//       return NextResponse.json({ error: "No file content or filename provided" }, { status: 400 });
//     }

//     const isCSV = fileName.toLowerCase().endsWith(".csv");
//     const isTXT = fileName.toLowerCase().endsWith(".txt");

//     if (!isCSV && !isTXT) {
//       return NextResponse.json({ error: "Invalid file format. Only CSV and TXT are allowed." }, { status: 400 });
//     }

//     let columns = [];
//     let rows = [];

//     const lines = fileContent.trim().split("\n").filter(line => line.trim() !== "");
//     if (lines.length > 1) {
//       const detectDelimiter = (line) => {
//         if (delimiter === "auto") {
//           if (line.includes(",")) return ",";
//           if (line.includes("\t")) return "\t";
//           return /\s+/;
//         }
//         return delimiter;
//       };

//       const usedDelimiter = detectDelimiter(lines[0]);

//       // 1. สร้าง columns และ trim
//       columns = lines[0].trim().split(usedDelimiter).map(col => col.trim());

//       // 2. ลบค่าว่างออก
//       columns = columns.filter(col => col !== "");

//       // 3. ถ้าไม่มี column หลังล้าง → สร้างอัตโนมัติจาก sample row
//       if (columns.length === 0 && lines.length > 1) {
//         const sampleRow = lines[1].trim().split(usedDelimiter);
//         columns = sampleRow.map((_, index) => `column_${index + 1}`);
//       }

//       // 4. ยังไม่มี columns → ส่ง error กลับ
//       if (columns.length === 0) {
//         return NextResponse.json({ error: "Unable to detect columns from the file." }, { status: 400 });
//       }

//       // 5. สร้าง rows พร้อมเติม column อัตโนมัติถ้าข้อมูลเกิน
//       rows = lines.slice(1).map((line) => {
//         const values = line.trim().split(usedDelimiter);

//         while (values.length > columns.length) {
//           columns.push(`column_${columns.length + 1}`);
//         }

//         while (values.length < columns.length) {
//           values.push("");
//         }

//         return columns.reduce((obj, col, index) => {
//           obj[col] = values[index];
//           return obj;
//         }, {});
//       });
//     }

//     if (columns.length === 0 || rows.length === 0) {
//       return NextResponse.json({ error: "File is empty or improperly formatted" }, { status: 400 });
//     }

//     const newFile = new File({
//       // userId: session.user.id, 
//       table_name: fileName,
//       columns,
//       rows,
//     });

//     await newFile.save();

//     return NextResponse.json({ message: "File uploaded successfully", fileId: newFile._id });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import File from "../../../../models/File";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey"; // ควรตั้งใน .env จริงจัง

export async function POST(req) {
  try {
    await connectMongoDB();

    // ✅ ตรวจสอบ Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const userId = decoded.id || decoded._id || decoded.userId;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 403 });
    }

    // ✅ รับข้อมูลจาก body
    const { fileName, fileContent, delimiter = ",", reportId } = await req.json();

    if (!fileName || !fileContent || !reportId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isCSV = fileName.toLowerCase().endsWith(".csv");
    const isTXT = fileName.toLowerCase().endsWith(".txt");

    if (!isCSV && !isTXT) {
      return NextResponse.json({ error: "Invalid file format. Only CSV and TXT allowed." }, { status: 400 });
    }

    const lines = fileContent.trim().split("\n").filter(line => line.trim() !== "");
    if (lines.length < 1) {
      return NextResponse.json({ error: "File is empty or malformed" }, { status: 400 });
    }

    const detectDelimiter = (line) => {
      if (delimiter === "auto") {
        if (line.includes(",")) return ",";
        if (line.includes("\t")) return "\t";
        return /\s+/;
      }
      return delimiter;
    };

    const usedDelimiter = detectDelimiter(lines[0]);

    // ✅ แปลงเป็น columns
    let columns = lines[0].split(usedDelimiter).map(col => col.trim()).filter(Boolean);
    if (columns.length === 0 && lines.length > 1) {
      const sample = lines[1].split(usedDelimiter);
      columns = sample.map((_, i) => `column_${i + 1}`);
    }

    if (columns.length === 0) {
      return NextResponse.json({ error: "Unable to detect columns" }, { status: 400 });
    }

    // ✅ สร้าง rows
    const rows = lines.slice(1).map(line => {
      const values = line.split(usedDelimiter).map(v => v.trim());
      while (values.length < columns.length) values.push("");
      while (values.length > columns.length) columns.push(`column_${columns.length + 1}`);
      return columns.reduce((obj, col, i) => {
        obj[col] = values[i];
        return obj;
      }, {});
    });

    if (rows.length === 0) {
      return NextResponse.json({ error: "No data rows found" }, { status: 400 });
    }

    // ✅ บันทึกลง MongoDB
    const newFile = new File({
      userId,
      reportId,
      table_name: fileName,
      columns,
      rows,
    });

    await newFile.save();

    return NextResponse.json({
      message: "Upload successful",
      fileId: newFile._id,
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

