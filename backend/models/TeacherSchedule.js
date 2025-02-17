const mongoose = require('mongoose');

const TeacherScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Nom de la matière
teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', },
  startTime: { type: String, required: true },   // Heure de début
  endTime: { type: String, required: true },     // Heure de fin
 classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class', // This is the reference to the Class model
 },  
 days: { type: [String], required: true },      // Jours de la semaine
}, { timestamps: true });

module.exports = mongoose.model('TeacherSchedule', TeacherScheduleSchema);
