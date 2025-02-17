const dailyRecordSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    attendance: { type: Boolean, required: true },
  });
  
  module.exports = mongoose.model('DailyRecord', dailyRecordSchema);
  