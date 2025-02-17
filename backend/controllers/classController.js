const Class = require('../models/Class');

// Ajouter une nouvelle classe
exports.createClass = async (req, res) => {
  try {
    const newClass = new Class({ name: req.body.name });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de l\'ajout de la classe' });
  }
};

// Obtenir toutes les classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('students');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du chargement des classes' });
  }
};

// Supprimer une classe
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.classId);
    res.json({ message: 'Classe supprimée avec succès' });
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la suppression de la classe' });
  }
};
