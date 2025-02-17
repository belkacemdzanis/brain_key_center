const TeacherSchedule = require('../models/TeacherSchedule');

// الحصول على جميع الجداول الزمنية
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await TeacherSchedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des emplois du temps', error });
  }
};

// إضافة جدول زمني جديد
exports.addSchedule = async (req, res) => {
  try {
    const { name, teacherId, startTime, endTime, classId, days } = req.body;

    // التحقق من وجود الأيام في الطلب
    if (!days || days.length === 0) {
      return res.status(400).json({ message: 'Les jours sont requis.' });
    }

    // التحقق من وجود ساعات البدء والانتهاء
    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Les heures de début et de fin sont requises.' });
    }

    const newSchedule = new TeacherSchedule({ name, teacherId, startTime, endTime, classId, days });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'emploi du temps', error });
  }
};

// تحديث جدول زمني
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params; // الحصول على id من المعامل
    const { name, teacherId, startTime, endTime, classId, days } = req.body;

    // تحديث جدول الحصص
    const updatedSchedule = await TeacherSchedule.findByIdAndUpdate(
      id,
      { name, teacherId, startTime, endTime, classId, days },
      { new: true } // لإرجاع الكائن المحدث
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'الجدول غير موجود' });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التحديث', error });
  }
};


// حذف جدول زمني
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await TeacherSchedule.findByIdAndDelete(id);
    res.status(200).json({ message: 'Emploi du temps supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'emploi du temps', error });
  }
};
