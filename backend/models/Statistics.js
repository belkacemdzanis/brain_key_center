const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  totalPayments: { type: Number, required: true },
  totalStudents: { type: Number, required: true },
  totalTeachers: { type: Number, required: true },
});

module.exports = mongoose.model('Statistics', statisticsSchema);
