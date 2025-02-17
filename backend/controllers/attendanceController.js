const Attendance = require('../models/Attendance');

exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate('studentId', 'firstName lastName')
      .populate('teacherId', 'firstName lastName')
      .populate('classId', 'name');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des présences', error });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('studentId', 'firstName lastName')
      .populate('teacherId', 'firstName lastName')
      .populate('classId', 'name');
    if (!attendance) {
      return res.status(404).json({ message: 'Présence introuvable' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la présence', error });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la présence', error });
  }
};

// Mettre à jour une présence
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAttendance) {
      return res.status(404).json({ message: "Présence non trouvée" });
    }
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

// Supprimer une présence
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      return res.status(404).json({ message: "Présence non trouvée" });
    }
    res.status(200).json({ message: "Présence supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};