const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  headers: { type: [String], default: [] },
  rows: { type: [[String]], default: [] },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
