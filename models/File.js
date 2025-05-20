import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  reportId: { type: String, required: true }, // ✅ เพิ่มบรรทัดนี้
  table_name: { type: String, required: true },
  columns: [String],
  rows: [Object],
}, { timestamps: true });

const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;


