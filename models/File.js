import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // เก็บชื่อไฟล์ CSV
  data: {
    type: [mongoose.Schema.Types.Mixed], // ใช้ Mixed รองรับคีย์ที่ไม่แน่นอน
    required: true
  }
});

const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;