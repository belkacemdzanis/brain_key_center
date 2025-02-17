const express = require('express');
const router = express.Router();
const {
  getAllSchedules,
  addSchedule,
  deleteSchedule,
  updateSchedule,
} = require('../controllers/teacherSchedulesController'); // تأكد من أن الكائن هو teacherSchedulesController

// Obtenir tous les emplois du temps
router.get('/', getAllSchedules);

// Ajouter un nouvel emploi du temps
router.post('/', addSchedule);

// Supprimer un emploi du temps
router.delete('/:id', deleteSchedule);

// Mettre à jour un emploi du temps
router.put('/:id', updateSchedule); // تأكد من أن المسار متوافق مع الكود في الواجهة الأمامية

module.exports = router;
