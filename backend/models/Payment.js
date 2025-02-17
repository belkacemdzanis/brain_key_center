const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Student', 'Teacher'],
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  nextPaymentDate: {
    type: Date,
  },
  paymentMethod: {
    type: String,
    enum: ["Payé", "Pas payé", "Payera plus tard"],
    required: true,
  },
  
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  material: {
    type: String,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
