const Payment = require("../models/Payment");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const mongoose = require('mongoose');
const winston = require('winston');

// Création du logger avec winston
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/server.log' })
  ]
});

// Fonction pour vérifier si un ID est valide
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Trouver une entité par ID et vérifier son existence
const findEntityById = async (model, id, entityName) => {
  if (!isValidObjectId(id)) {
    throw new Error(`${entityName} ID est invalide.`);
  }
  const entity = await model.findById(id);
  if (!entity) {
    throw new Error(`${entityName} non trouvé.`);
  }
  return entity;
};

// Obtenir tous les paiements avec les informations des étudiants, enseignants et classes
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("studentId", "firstName lastName")
      .populate("teacherId", "firstName lastName")
      .populate("class", "name");

    res.status(200).json(payments);
  } catch (error) {
    logger.error("Erreur lors de la récupération des paiements", error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Ajouter un nouveau paiement
exports.addPayment = async (req, res) => {
  try {
    const { paymentAmount, type, paymentDate, nextPaymentDate, studentId, teacherId, paymentMethod, material, class: classId } = req.body;

    if (!paymentAmount || !type || !paymentDate || !paymentMethod) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    // Validation des entités
    if (type === "Student" && studentId) await findEntityById(Student, studentId, "الطالب");
    if (type === "Teacher" && teacherId) await findEntityById(Teacher, teacherId, "المدرس");
    if ((type === "Student" || type === "Teacher") && classId) {
      await findEntityById(Class, classId, "الصف الدراسي");
    }

    // Création du paiement
    const newPayment = new Payment({
      paymentAmount,
      type,
      paymentDate,
      nextPaymentDate,
      studentId: type === "Student" ? studentId : undefined,
      teacherId: type === "Teacher" ? teacherId : undefined,
      paymentMethod,
      material,
      ...(classId ? { class: classId } : {}),
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    logger.error("Erreur lors de l'ajout du paiement", error.message);
    res.status(500).json({
      message: error.message || "Erreur interne du serveur.",
      errorStack: error.stack || "", // Ajout du stack pour un débogage plus facile
    });
  }
};

// Supprimer un paiement
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Paiement introuvable." });
    }

    res.status(200).json({ message: "Paiement supprimé avec succès." });
  } catch (error) {
    logger.error("Erreur lors de la suppression du paiement", error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Mettre à jour un paiement
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentAmount, type, paymentDate, nextPaymentDate, studentId, teacherId, paymentMethod, material, class: classId } = req.body;

    if (!paymentAmount || !type || !paymentDate || !paymentMethod) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    // Validation des entités
    if (type === "Student" && studentId) await findEntityById(Student, studentId, "الطالب");
    if (type === "Teacher" && teacherId) await findEntityById(Teacher, teacherId, "المدرس");
    if ((type === "Student" || type === "Teacher") && classId) {
      await findEntityById(Class, classId, "الصف الدراسي");
    }

    // Mise à jour du paiement
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        paymentAmount,
        type,
        paymentDate,
        nextPaymentDate,
        studentId: type === "Student" ? studentId : undefined,
        teacherId: type === "Teacher" ? teacherId : undefined,
        paymentMethod,
        material,
        ...(classId ? { class: classId } : {}),
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Paiement introuvable." });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    logger.error("Erreur lors de la mise à jour du paiement", error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
