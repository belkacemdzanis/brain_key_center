const Student = require('../models/Student');

// Récupérer tous les étudiants
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouvel étudiant
const addStudent = async (req, res) => {
  const { firstName, lastName, grade, classe, contact, birthDate, paymentAmount, paymentMethod, paymentDate, nextPaymentDate } = req.body;

  try {
    const newStudent = new Student({
      firstName,
      lastName,
      grade,
      classe,
      contact,
      birthDate,
      paymentAmount,
      paymentMethod,
      paymentDate,
      nextPaymentDate
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un étudiant
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.status(200).json({ message: 'Étudiant supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un étudiant
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, grade, classe, contact, birthDate, paymentAmount, paymentMethod, paymentDate, nextPaymentDate } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.grade = grade || student.grade;
    student.classe = classe || student.classe;
    student.contact = contact || student.contact;
    student.birthDate = birthDate || student.birthDate;
    student.paymentAmount = paymentAmount || student.paymentAmount;
    student.paymentMethod = paymentMethod || student.paymentMethod;
    student.paymentDate = paymentDate || student.paymentDate;
    student.nextPaymentDate = nextPaymentDate || student.nextPaymentDate;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer le nombre total d'étudiants
const getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du nombre total d\'étudiants' });
  }
};

// Récupérer les étudiants ayant un paiement à venir dans la semaine
const getStudentsWithUpcomingPayments = async (req, res) => {
  try {
    const currentDate = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(currentDate.getDate() + 7);

    const students = await Student.find({
      nextPaymentDate: { $gte: currentDate, $lte: oneWeekFromNow }
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des étudiants avec des paiements à venir' });
  }
};

module.exports = {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentCount,
  getStudentsWithUpcomingPayments
};
