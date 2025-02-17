const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  address: {
    type: String,
    default: '',
  },
  monthlyPayment: {
    type: Number,
    required: true,
    min: [0, 'Monthly payment must be a positive number'],
  },
  paymentDate: {
    type: Date,
    required: true,
  },
   
});

// Indexes for performance
teacherSchema.index({ email: 1 });
teacherSchema.index({ phone: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);
