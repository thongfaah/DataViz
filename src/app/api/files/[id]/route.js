// app/api/files/[id]/route.js

import { connectMongoDB } from "../../../../../lib/mongodb";
import File from "../../../../../models/File";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    const body = await req.json();

    const updated = await File.findByIdAndUpdate(
      id,
      {
        columns: body.columns,
        rows: body.rows,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "File updated successfully", file: updated });
  } catch (error) {
    return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
  }
}
