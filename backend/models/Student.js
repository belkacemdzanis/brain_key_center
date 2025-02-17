const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  grade: { type: String, required: true },
  classe: { type: String, required: true },
  contact: { type: String, required: true },
  birthDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  paymentAmount:{ type: Number, required: true },
   paymentDate: { type: Date, required: true },
  nextPaymentDate: { type: Date, required: true },    
});

module.exports = mongoose.model('Student', studentSchema);
