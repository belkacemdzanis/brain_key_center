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
  const { firstName, lastName, email, monthlyPayment, phone } = req.body;

  // Vérification des champs obligatoires
  if (!firstName || !lastName || !email || !monthlyPayment || !phone) {
    return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
  }

  // Vérification du numéro de téléphone (doit contenir exactement 10 chiffres)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Veuillez fournir un numéro de téléphone valide (10 chiffres)." });
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
