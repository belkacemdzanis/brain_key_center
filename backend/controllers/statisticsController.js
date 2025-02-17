const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Payment = require('../models/Payment');

const getStatistics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalPayments = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalPayments: totalPayments[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStatistics };
