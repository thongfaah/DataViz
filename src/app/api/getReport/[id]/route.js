import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongodb'; 
import Report from '../../../../../models/Report';

// ✅ เชื่อมต่อ Database
await connectMongoDB();

// ✅ GET Method
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const report = await Report.findById(id);
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Error fetching report" }, { status: 500 });
  }
}

// ✅ PUT Method
export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, content } = await request.json();

  try {
    const updates = {};
if (title !== undefined) updates.title = title;
if (description !== undefined) updates.description = description;
if (content !== undefined) updates.content = content;

const updatedReport = await Report.findByIdAndUpdate(id, updates, { new: true });

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
  }
}

// ✅ DELETE Method
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await Report.findByIdAndDelete(id);
    return NextResponse.json({ message: "Report deleted successfully" }, { status: 204 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Failed to delete report" }, { status: 500 });
  }
}
