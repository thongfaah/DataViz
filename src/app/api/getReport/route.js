import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb'; 
import Report from '../../../../models/Report';
import jwt from 'jsonwebtoken';

const SECRET = "mysecretkey"; // ✅ ควรเปลี่ยนเป็น Environment Variable เช่น process.env.JWT_SECRET

// ✅ 1️⃣ POST: สร้าง Report ใหม่
export async function POST(request) {
  try {
    await connectMongoDB();
    
    // ✅ ดึง JWT Token จาก Header
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // ✅ ตรวจสอบและถอดรหัส Token
    const decoded = jwt.verify(token, SECRET);

    const { title, description, content } = await request.json();

    // ✅ สร้าง Report ใหม่
    const newReport = await Report.create({ 
      title, 
      description, 
      content, 
      userId: decoded.userId // ✅ ใช้ userId จาก Token
    });

    return NextResponse.json(newReport, { status: 201 });

  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ message: 'Failed to create report.' }, { status: 500 });
  }
}

// ✅ 2️⃣ GET: ดึงข้อมูล Report ของ User ที่ล็อกอิน
export async function GET(request) {
  try {
    await connectMongoDB();

    // ✅ ดึง JWT Token จาก Header
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // ✅ ตรวจสอบและถอดรหัส Token
    const decoded = jwt.verify(token, SECRET);

    // ✅ ดึงข้อมูล Report จาก userId ที่ถอดรหัสได้
    const reports = await Report.find({ userId: decoded.userId });

    return NextResponse.json(reports, { status: 200 });

  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ message: 'Failed to fetch reports.' }, { status: 500 });
  }
}
