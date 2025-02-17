const DailyRecord = require('../models/DailyRecord');

// إضافة سجل يومي
const addDailyRecord = async (req, res) => {
  const { student, class: classId, date, subject, attendance } = req.body;
  try {
    const record = new DailyRecord({ student, class: classId, date, subject, attendance });
    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// عرض السجلات بناءً على المادة أو اليوم
const getDailyRecords = async (req, res) => {
  const { date, subject } = req.query;
  try {
    const query = {};
    if (date) query.date = new Date(date);
    if (subject) query.subject = subject;

    const records = await DailyRecord.find(query).populate('student').populate('class');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDailyRecord, getDailyRecords };
