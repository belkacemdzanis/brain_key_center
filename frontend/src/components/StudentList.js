import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentModal from  './AddStudentModal';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('${process.env.REACT_APP_API_URL}/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données des étudiants :', error);
    }
  };

  const addStudent = async (student) => {
    try {
      const response = await axios.post('${process.env.REACT_APP_API_URL}/students', student);
      setStudents([...students, response.data]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant :', error.response.data); // Log detailed error response
    }
    
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant :', error);
    }
  };

  const updateStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/students/${updatedStudent._id}`, updatedStudent);
      setStudents(students.map((student) => (student._id === updatedStudent._id ? response.data : student)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données de l\'étudiant :', error);
    }
  };

  const openModal = (student = null) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const isNextPaymentDueSoon = (nextPaymentDate) => {
    const currentDate = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const daysDiff = (paymentDate - currentDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    (student.firstName ? student.firstName.toLowerCase() : '')
      .includes(searchQuery.toLowerCase()) ||
    (student.lastName ? student.lastName.toLowerCase() : '')
      .includes(searchQuery.toLowerCase()) ||
    (student.grade ? student.grade.toLowerCase() : '')
      .includes(searchQuery.toLowerCase()) ||
      (student.classe ? student.classe.toLowerCase() : '')
      .includes(searchQuery.toLowerCase()) ||
    (student.contact ? student.contact.toLowerCase() : '')
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mb-4 transition duration-300"
        >
          Ajouter un nouvel étudiant
        </button>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-600">Aucun étudiant trouvé.</p>
      ) : (
        <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden mx-auto max-w-4xl">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-8 text-left">Nom</th>
              <th className="py-3 px-8 text-left">Prénom</th>
              <th className="py-3 px-6 text-left">Grade</th>
              <th className="py-3 px-6 text-left">Classe</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-left">Date de naissance</th>
              <th className="py-3 px-6 text-left">Montant du paiement</th>
              <th className="py-3 px-6 text-left">Méthode de paiement</th>
              <th className="py-3 px-6 text-left">Date de paiement</th>
              <th className="py-3 px-6 text-left">Date du prochain paiement</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="border-b hover:bg-indigo-50">
                <td className="py-3 px-8">{student.firstName}</td>
                <td className="py-3 px-8">{student.lastName}</td>
                <td className="py-3 px-6">{student.grade}</td>
                <td className="py-3 px-6">{student.classe}</td>
                <td className="py-3 px-6">{student.contact}</td>
                <td className="py-3 px-6">{new Date(student.birthDate).toLocaleDateString('fr-CA')}</td>
                <td className="py-3 px-6">{student.paymentAmount}</td>
                <td className="py-3 px-6">{student.paymentMethod}</td>
                <td className="py-3 px-6">{new Date(student.paymentDate).toLocaleDateString('fr-CA')}</td>
                <td
                  className={`py-3 px-6 ${isNextPaymentDueSoon(student.nextPaymentDate) ? 'bg-red-200' : ''}`}
                >
                  {new Date(student.nextPaymentDate).toLocaleDateString('fr-CA')}
                </td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    onClick={() => openModal(student)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
        <AddStudentModal
          onClose={closeModal}
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          selectedStudent={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentList;
