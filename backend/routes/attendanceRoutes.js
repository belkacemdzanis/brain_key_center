const express = require('express');
const {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');

const router = express.Router();

router.get('/', getAllAttendances);
router.get('/:id', getAttendanceById);
router.post('/', createAttendance);
router.put("/:id", updateAttendance); // Mettre à jour une présence
router.delete("/:id", deleteAttendance); // Supprimer une présence
module.exports = router;
