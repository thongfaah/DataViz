import  getSession  from "next-auth";
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";


export async function POST(req) {
    try {
      // เชื่อมต่อกับ MongoDB
      await connectMongoDB();
  
      // ดึง token จาก cookie
      const token = req.cookies.get("token")?.value;
  
      if (!token) {
        return NextResponse.json({ message: "No token provided" }, { status: 400 });
      }
  
      // ลบ token ออกจากฐานข้อมูล
      await getSession.findOneAndDelete({ token });
  
      // ลบ cookie token
      const response = NextResponse.json({ message: "Logged out successfully" });
      response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
  
      return response;
    } catch (error) {
      console.error("Error during logout:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }