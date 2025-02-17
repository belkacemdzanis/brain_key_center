const express = require('express');
const { createClass, getClasses, deleteClass } = require('../controllers/classController');
const router = express.Router();

// Ajouter une classe
router.post('/', createClass);

// Obtenir toutes les classes
router.get('/', getClasses);

// Supprimer une classe
router.delete('/:classId', deleteClass);

module.exports = router;
