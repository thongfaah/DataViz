import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  table_name: { type: String, required: true }, // ✅ เก็บชื่อไฟล์เป็น table_name
  columns: [{ type: String, required: true }], // ✅ เก็บชื่อคอลัมน์ทั้งหมด
  rows: [{ type: mongoose.Schema.Types.Mixed, required: true }] // ✅ เก็บข้อมูลในรูปแบบ Array of Objects
}, { timestamps: true });

const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;


