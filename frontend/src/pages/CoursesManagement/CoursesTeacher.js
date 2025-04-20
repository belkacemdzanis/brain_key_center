import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesTeacher = () => {
  const [teacherSchedules, setTeacherSchedules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    _id: "", // Ajout de _id pour suivre l'ID du cours lors des mises à jour
    name: "",
    teacherId: "",
    startTime: "",
    endTime: "",
    days: [],
    classId: "",
  });

  // Récupérer les emplois du temps, enseignants et classes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesResponse, teachersResponse, classesResponse] = await Promise.all([
          axios.get("${process.env.REACT_APP_API_URL}/teacher-schedules"),
          axios.get("${process.env.REACT_APP_API_URL}/teachers"),
          axios.get("${process.env.REACT_APP_API_URL}/classes"),
        ]);
        setTeacherSchedules(schedulesResponse.data);
        setTeachers(teachersResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la sélection des jours
  const handleDaysChange = (e) => {
    const selectedDay = e.target.value;
    if (e.target.checked) {
      setFormData({ ...formData, days: [...formData.days, selectedDay] });
    } else {
      setFormData({
        ...formData,
        days: formData.days.filter((day) => day !== selectedDay),
      });
    }
  };

  // Ajouter ou mettre à jour un cours
  const addOrUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formData._id) {
        // Mise à jour du cours
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/teacher-schedules/${formData._id}`,
          formData
        );
        setTeacherSchedules(
          teacherSchedules.map((course) =>
            course._id === formData._id ? response.data : course
          )
        );
      } else {
        // Ajouter un nouveau cours
        response = await axios.post(
          "${process.env.REACT_APP_API_URL}/teacher-schedules",
          formData
        );
        setTeacherSchedules([...teacherSchedules, response.data]);
      }

      // Réinitialiser le formulaire
      setFormData({
        _id: "",
        name: "",
        teacherId: "",
        startTime: "",
        endTime: "",
        days: [],
        classId: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout ou la mise à jour du cours :", error);
    }
  };

  // Modifier un cours (préremplir le formulaire pour la mise à jour)
  const editCourse = (course) => {
    setFormData({
      _id: course._id,
      name: course.name,
      teacherId: course.teacherId,
      startTime: course.startTime,
      endTime: course.endTime,
      days: course.days,
      classId: course.classId,
    });
  };

  // Supprimer un cours
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/teacher-schedules/${id}`);
      setTeacherSchedules(teacherSchedules.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du cours :", error);
    }
  };

  // Fonction pour obtenir le nom de l'enseignant par ID
  const getTeacherName = (id) => {
    const teacher = teachers.find((teacher) => teacher._id === id);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : "Inconnu";
  };

  // Fonction pour obtenir le nom de la classe par ID
  const getClassName = (id) => {
    const classroom = classes.find((classroom) => classroom._id === id);
    return classroom ? classroom.name : "Inconnue";
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Emplois du temps des enseignants</h1>

      {/* Formulaire */}
      <div className="mb-6 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ajouter ou modifier une matière</h2>
        <form onSubmit={addOrUpdateCourse} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nom de la matière"
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Choisissez un enseignant</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-600 font-medium mb-2">Jours :</label>
            <div className="flex flex-wrap gap-3">
              {["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map(
                (day) => (
                  <label key={day} className="inline-flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      value={day}
                      checked={formData.days.includes(day)}
                      onChange={handleDaysChange}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    {day}
                  </label>
                )
              )}
            </div>
          </div>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Choisissez une salle</option>
            {classes.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>
                {classroom.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            {formData._id ? "Mettre à jour" : "Ajouter"}
          </button>
        </form>
      </div>

      {/* Tableau d'affichage */}
      <div className="overflow-x-auto bg-white p-6 rounded shadow-md">
        <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nom de la matière</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Enseignant</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Heure de début</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Heure de fin</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Jours</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Salle</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherSchedules.length > 0 ? (
              teacherSchedules.map((course, index) => (
                <tr key={course._id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{getTeacherName(course.teacherId)}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.startTime}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.endTime}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {course.days.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{getClassName(course.classId)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => editCourse(course)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  Aucun cours trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTeacher;
