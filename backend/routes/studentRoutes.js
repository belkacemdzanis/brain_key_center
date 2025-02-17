const express = require('express');
const router = express.Router();
const {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentCount,
  getStudentsWithUpcomingPayments,
} = require('../controllers/studentController');

// Récupérer tous les étudiants
router.get('/', getStudents);

// Ajouter un nouvel étudiant
router.post('/', addStudent);

// Supprimer un étudiant par ID
router.delete('/:id', deleteStudent);

// Mettre à jour un étudiant par ID
router.put('/:id', updateStudent);

// Récupérer le nombre total d'étudiants
router.get('/count', getStudentCount);

// Récupérer les étudiants ayant des paiements à venir dans la semaine
router.get('/upcoming-payments', getStudentsWithUpcomingPayments);

module.exports = router;
