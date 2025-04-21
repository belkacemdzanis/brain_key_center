import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAttendanceModal = ({
  students,    // Liste des étudiants pour la sélection
  teachers,    // Liste des enseignants pour la sélection
  classes,     // Liste des classes pour la sélection
  closeModal,  // Fonction pour fermer le modal
  fetchAttendances, // Fonction pour récupérer les présences après ajout
  isOpen,      // État d'ouverture ou de fermeture du modal
  attendanceId, // ID du présence pour modification (si présent)
}) => {
  // États locaux pour gérer les champs du formulaire
  const [type, setType] = useState("Student"); // Type de présence : Étudiant ou Enseignant
  const [studentId, setStudentId] = useState(""); // ID de l'étudiant sélectionné
  const [teacherId, setTeacherId] = useState(""); // ID de l'enseignant sélectionné
  const [classId, setClassId] = useState(""); // ID de la classe sélectionnée
  const [subjectName, setSubjectName] = useState(""); // Sujet de la présence
  const [status, setStatus] = useState("Present"); // Statut de la présence : Présent, Absent, etc.
  const [time, setTime] = useState(""); // Heure de la présence
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Date par défaut : aujourd'hui

  // Si un `attendanceId` est passé, charger les données de présence
  const [currentAttendance, setCurrentAttendance] = useState({
    type: "Student",
    studentId: "",
    teacherId: "",
    classId: "",
    subjectName: "",
    status: "Present",
    time: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (attendanceId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/attendance/${attendanceId}`)
        .then((response) => {
          const attendance = response.data;
          setType(attendance.type);
          setStudentId(attendance.studentId || "");
          setTeacherId(attendance.teacherId || "");
          setClassId(attendance.classId);
          setSubjectName(attendance.subjectName);
          setStatus(attendance.status);
          setTime(attendance.time);
          setDate(attendance.date);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données de présence", error);
          alert("Erreur lors de la récupération des données.");
        });
    }
  }, [attendanceId]);

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceData = {
      type,
      studentId: type === "Student" ? studentId : undefined,
      teacherId: type === "Teacher" ? teacherId : undefined,
      classId,
      subjectName,
      status,
      time,
      date,
    };

    try {
      let response;
      if (attendanceId) {
        // Si un `attendanceId` existe, on effectue une mise à jour avec `PUT`
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/attendance/${attendanceId}`,
          attendanceData
        );
      } else {
        // Sinon, on effectue une création avec `POST`
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/attendance`,
          attendanceData
        );
        
      }

      console.log("Réponse du serveur:", response.data);
      fetchAttendances(); // Actualiser la liste des présences
      closeModal(); // Fermer le modal après succès
    } catch (error) {
      console.error("Erreur lors de la création de la présence", error.response?.data || error.message);
      alert("Erreur lors de la création de la présence.");
    }
  };

  // Si le modal n'est pas ouvert, ne rien afficher
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Ajouter/Modifier une présence</h2>

        {/* Sélection du type de présence */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">Type de présence</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Student">Étudiant</option>
            <option value="Teacher">Enseignant</option>
          </select>
        </div>

        {/* Sélection de l'étudiant si le type est "Student" */}
        {type === "Student" && (
          <div className="mb-4">
            <label htmlFor="studentId" className="block text-gray-700">Étudiant</label>
            <select
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Choisir un étudiant</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sélection de l'enseignant si le type est "Teacher" */}
        {type === "Teacher" && (
          <div className="mb-4">
            <label htmlFor="teacherId" className="block text-gray-700">Enseignant</label>
            <select
              id="teacherId"
              name="teacherId"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Choisir un enseignant</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sélection de la classe */}
        <div className="mb-4">
          <label htmlFor="classId" className="block text-gray-700">Classe</label>
          <select
            id="classId"
            name="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner une classe</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Champ de saisie pour le sujet */}
        <div className="mb-4">
          <label htmlFor="subjectName" className="block text-gray-700">Sujet</label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Champ de saisie pour l'heure */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">Heure</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Champ de saisie pour la date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Sélection du statut */}
        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700">Statut</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Present">Présent</option>
            <option value="Absent">Absent</option>
            <option value="En retard">En retard</option>
          </select>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-white px-4 py-2 rounded-md mr-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {attendanceId ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAttendanceModal;
