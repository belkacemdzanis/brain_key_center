import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Récupération des données depuis le serveur lors du chargement du composant
  useEffect(() => {
    const fetchAttendances = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/attendance`);
        setAttendances(response.data);
        
      } catch (err) {
        setError("Erreur lors de la récupération des données de présence");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, []);

  // Calcul des statistiques avec useMemo
  const report = useMemo(() => {
    const totalRecords = attendances.length || 0;
    const presentCount = attendances.filter(
      (record) => record.status === "Present"
    ).length;
    const absentCount = attendances.filter(
      (record) => record.status === "Absent"
    ).length;
    const lateCount = attendances.filter(
      (record) => record.status === "En retard"
    ).length;

    return {
      totalRecords,
      presentCount,
      absentCount,
      lateCount,
    };
  }, [attendances]);

  // Calcul des absences fréquentes
  const frequentAbsentees = useMemo(() => {
    const absenteeCounts = attendances.reduce((acc, record) => {
      if (record.status === "Absent") {
        const personName =
          record.type === "Student"
            ? `${record.studentId?.firstName || ""} ${record.studentId?.lastName || ""}`
            : `${record.teacherId?.firstName || ""} ${record.teacherId?.lastName || ""}`;

        acc[personName] = (acc[personName] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(absenteeCounts)
      .filter(([name, count]) => count > 3)
      .map(([name, count]) => ({ name, count }));
  }, [attendances]);

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">
        Rapport de présence
      </h2>

      {loading ? (
        <p className="text-gray-500">Chargement en cours...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-green-700">Total</h3>
            <p className="text-2xl font-semibold">{report.totalRecords}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-blue-700">Présents</h3>
            <p className="text-2xl font-semibold">{report.presentCount}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-red-700">Absents</h3>
            <p className="text-2xl font-semibold">{report.absentCount}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-yellow-700">En retard</h3>
            <p className="text-2xl font-semibold">{report.lateCount}</p>
          </div>
        </div>
      )}

      <h3 className="text-lg font-bold text-red-600 mt-6">
        Personnes ayant plus de 3 absences :
      </h3>
      {frequentAbsentees.length > 0 ? (
        <ul className="list-disc ml-6">
          {frequentAbsentees.map((person) => (
            <li key={person.name} className="text-gray-700">
              {person.name} - <span className="font-bold">{person.count} absences</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Aucun individu n'a enregistré plus de 3 absences.
        </p>
      )}
    </div>
  );
};

export default AttendanceReport;
