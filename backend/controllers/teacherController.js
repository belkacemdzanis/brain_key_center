// controllers/teacherController.js
const Teacher = require('../models/Teacher');
const mongoose = require('mongoose');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des enseignants." });
  }
};

exports.createTeacher = async (req, res) => {
  const { firstName, lastName, email, employeeType, phone, monthlyPayment, paymentDate } = req.body;

if (!firstName || !lastName || !email || !employeeType || !phone || !monthlyPayment || !paymentDate) {
  return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
}
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout de l'enseignant.", error: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Enseignant introuvable." });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour.", error: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Enseignant introuvable." });
    }

    res.status(200).json({ message: "Enseignant supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur.", error: error.message });
  }
};
