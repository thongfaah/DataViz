import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Report'
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: Array,
    default: []
  },
  userId: {
    type: String,
    required: true
  },
  
}, { timestamps: true });

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema);

export default Report;