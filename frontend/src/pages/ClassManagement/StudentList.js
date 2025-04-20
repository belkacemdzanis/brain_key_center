import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = ({ selectedClass }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/students');
        setStudents(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des étudiants.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    !selectedClass || student.classe === selectedClass
  );

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch {
      setError("Erreur lors de la suppression de l'étudiant.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/students/${selectedStudent._id}`, selectedStudent);
      setStudents(students.map((student) =>
        student._id === selectedStudent._id ? response.data : student
      ));
      setIsModalOpen(false);
    } catch {
      setError("Erreur lors de la mise à jour de l'étudiant.");
    }
  };

  return (
    <div className="mt-4">
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : filteredStudents.length === 0 ? (
        <p className="text-center text-gray-600">Aucun étudiant trouvé pour cette classe.</p>
      ) : (
        <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-8 text-left">Nom</th>
              <th className="py-3 px-8 text-left">Prénom</th>
              <th className="py-3 px-6 text-left">Date de naissance</th>
              <th className="py-3 px-6 text-left">Grade</th>
              <th className="py-3 px-6 text-left">Classe</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="border-b hover:bg-indigo-50">
                <td className="py-3 px-8">{student.firstName}</td>
                <td className="py-3 px-8">{student.lastName}</td>
                <td className="py-3 px-6">{new Date(student.birthDate).toLocaleDateString('fr-CA')}</td>
                <td className="py-3 px-6">{student.grade}</td>
                <td className="py-3 px-6">{student.classe}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Modifier étudiant</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  value={selectedStudent?.firstName || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, firstName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  value={selectedStudent?.lastName || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, lastName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                <input
                  type="date"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  value={selectedStudent?.birthDate || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, birthDate: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Grade</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  value={selectedStudent?.grade || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, grade: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Classe</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  value={selectedStudent?.classe || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, classe: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
