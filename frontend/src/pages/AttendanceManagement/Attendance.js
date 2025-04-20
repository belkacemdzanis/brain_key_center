import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import AddAttendanceModal from "./AddAttendanceModal";

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Student");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingAttendance, setEditingAttendance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, classesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/students`),
          axios.get(`${process.env.REACT_APP_API_URL}/teachers`),
          axios.get(`${process.env.REACT_APP_API_URL}/classes`),
        ]);
        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
        setClasses(classesRes.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, []);

  const fetchAttendances = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/attendance`);
      setAttendances(res.data);
      
    } catch (error) {
      console.error("Erreur lors de la récupération des données des présences", error);
    }
  }, []);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  const openModal = (attendance = null) => {
    setEditingAttendance(attendance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingAttendance(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا السجل؟")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/attendance/${id}`);
        fetchAttendances(); // تحديث البيانات بعد الحذف
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  const getClassNameById = (classId) => {
    const classItem = classes.find((cls) => cls._id === classId);
    return classItem ? classItem.name : "Classe non trouvée";
  };

  const filteredAttendances = useMemo(() => {
    const dateToCompare = selectedDate || new Date().toISOString().split("T")[0];
    return attendances.filter((attendance) => {
      const recordDate = new Date(attendance.date).toISOString().split("T")[0];
      return (
        attendance.type === activeTab &&
        (statusFilter === "All" || attendance.status === statusFilter) &&
        recordDate === dateToCompare
      );
    });
  }, [attendances, activeTab, statusFilter, selectedDate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Gestion des présences</h2>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "Student" ? "bg-gradient-to-r from-indigo-600 to-indigo-400 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("Student")}
        >
          Présences des étudiants
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Teacher" ? "bg-gradient-to-r from-indigo-600 to-indigo-400 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("Teacher")}
        >
          Présences des enseignants
        </button>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="statusFilter" className="text-gray-700 font-semibold">
          Filtrer par statut :
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="All">toutes</option>
          <option value="Present">Présent</option>
          <option value="Absent">Absent</option>
          <option value="En retard">En retard</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="attendanceDate" className="mr-2">Sélectionner une date :</label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
      >
        Ajouter une présence
      </button>

      <table className="min-w-full bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
            <th className="py-3 px-5 border-b text-left font-semibold">Nom</th>
            <th className="py-3 px-5 border-b text-left font-semibold">Sujet</th>
            <th className="py-3 px-5 border-b text-left font-semibold">Heure</th>
            <th className="py-3 px-5 border-b text-left font-semibold">Date</th>
            <th className="py-3 px-5 border-b text-left font-semibold">Statut</th>
            <th className="py-3 px-5 border-b text-left font-semibold">Classe</th>
            <th className="py-3 px-5 border-b text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendances.length > 0 ? (
            filteredAttendances.map((attendance) => (
              <tr key={attendance._id} className="hover:bg-blue-100 transition duration-200 text-gray-800">
                <td className="py-3 px-5 border-b text-sm">
                  {attendance.type === "Student"
                    ? `${attendance.studentId?.firstName || ""} ${attendance.studentId?.lastName || ""}`
                    : `${attendance.teacherId?.firstName || ""} ${attendance.teacherId?.lastName || ""}`}
                </td>
                <td className="py-3 px-5 border-b text-sm">{attendance.subjectName || "N/A"}</td>
                <td className="py-3 px-5 border-b text-sm">{attendance.time || "N/A"}</td>
                <td className="py-3 px-5 border-b text-sm">{new Date(attendance.date).toLocaleDateString() || "N/A"}</td>
                <td
                  className={`py-3 px-5 border-b text-sm font-bold ${
                    attendance.status === "Present"
                      ? "text-green-600"
                      : attendance.status === "Absent"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {attendance.status}
                </td>
                <td className="py-3 px-5 border-b text-sm">{attendance.classId?.name || "Classe non trouvée"}</td>
                <td className="py-3 px-5 border-b text-sm">
                  <button
                    onClick={() => openModal(attendance)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(attendance._id)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500 font-semibold">
                Aucune donnée trouvée pour les filtres sélectionnés.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddAttendanceModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchAttendances={fetchAttendances}
        students={students}
        teachers={teachers}
        classes={classes}
        editingAttendance={editingAttendance}
      />
    </div>
  );
};

export default Attendance;
