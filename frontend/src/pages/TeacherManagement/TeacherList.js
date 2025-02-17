import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTeacherModal from './AddTeacherModal';
import EditTeacherModal from './EditTeacherModal';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Charger la liste des enseignants
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/teachers')
      .then((response) => {
        setTeachers(response.data);
        setFilteredTeachers(response.data);
      })
      .catch((error) => console.error('Erreur de chargement:', error));
  }, []);

  // Filtrer les enseignants
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter((teacher) => {
        const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
        return (
          fullName.includes(searchQuery.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredTeachers(filtered);
    }
  }, [searchQuery, teachers]);

  const handleAddTeacher = async (newTeacher) => {
    try {
      const response = await axios.post('http://localhost:5000/api/teachers', newTeacher);
      setTeachers([...teachers, response.data]);
      setFilteredTeachers([...teachers, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur:', error.response?.data || error.message);
      alert(`Erreur: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleUpdateTeacher = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/teachers/${id}`, updatedData);
      setTeachers(teachers.map((teacher) => (teacher._id === id ? response.data : teacher)));
      setFilteredTeachers(teachers.map((teacher) => (teacher._id === id ? response.data : teacher)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Erreur de mise à jour :', error);
      alert('Erreur lors de la mise à jour de l’enseignant.');
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      setFilteredTeachers(teachers.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de l’enseignant.');
    }
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher un enseignant..."
          className="border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition duration-300"
        >
          Ajouter un nouvel enseignant
        </button>
      </div>

      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden mx-auto">
        <thead className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-4 rounded-lg shadow-md">
          <tr>
            <th className="py-3 px-4 text-white text-left">Prénom</th>
            <th className="py-3 px-4 text-white text-left">Nom</th>
            <th className="py-3 px-4 text-white text-left">Type d'employé</th>
            <th className="py-3 px-4 text-white text-left">Numéro de téléphone</th>
            <th className="py-3 px-4 text-white text-left">Email</th>
            <th className="py-3 px-4 text-white text-left">Paiement mensuel</th>
            <th className="py-3 px-4 text-white text-left">Date de paiement</th>
             <th className="py-3 px-4 text-white text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => {
            const paymentDate = new Date(teacher.paymentDate);
            const today = new Date();
            const diffInDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24));

            let rowClass = '';
            if (diffInDays <= 3) rowClass = 'bg-red-100';
            else if (diffInDays <= 7) rowClass = 'bg-orange-100';

            return (
              <tr key={teacher._id} className={`border-b hover:bg-blue-50 ${rowClass}`}>
                <td className="py-3 px-4">{teacher.firstName}</td>
                <td className="py-3 px-4">{teacher.lastName}</td>
                <td className="py-3 px-4">{teacher.employeeType}</td>
                <td className="py-3 px-4">{teacher.phone}</td>
                <td className="py-3 px-4">{teacher.email}</td>
                <td className="py-3 px-4">{teacher.monthlyPayment}</td>
                <td className="py-3 px-4">{new Date(teacher.paymentDate).toLocaleDateString()}</td>
                 <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => openEditModal(teacher)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && <AddTeacherModal onClose={() => setIsModalOpen(false)} onAddTeacher={handleAddTeacher} />}
      {isEditModalOpen && selectedTeacher && (
        <EditTeacherModal
          teacher={selectedTeacher}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateTeacher={handleUpdateTeacher}
        />
      )}
    </div>
  );
};

export default TeacherList;
