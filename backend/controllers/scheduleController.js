const Schedule = require('../models/Schedule');

// Obtenir tous les horaires
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des horaires.', error });
  }
};

// Mettre à jour ou ajouter un ensemble d'horaires
const updateSchedules = async (req, res) => {
  try {
    const schedules = req.body;

    // Supprimer tous les anciens documents et insérer les nouveaux
    await Schedule.deleteMany({});
    const createdSchedules = await Schedule.insertMany(schedules);

    res.status(200).json(createdSchedules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des horaires.', error });
  }
};

module.exports = {
  getAllSchedules,
  updateSchedules,
};
