import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddClassModal from './AddClassModal';
import StudentList from './StudentList';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des classes:', error);
      }
    };
    getClasses();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDeleteClass = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/classes/${id}`);
      setClasses(classes.filter(classData => classData._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la classe:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Classes</h1>

      {showModal && <AddClassModal setClasses={setClasses} closeModal={closeModal} />}
      
      {/* Select dropdown for filtering by class */}
      <div className="mb-4">
        <label htmlFor="classSelect" className="block text-lg font-medium">Filtrer par classe</label>
        <select
          id="classSelect"
          onChange={handleClassChange}
          value={selectedClass}
          className="mt-2 p-2 border rounded"
        >
          <option value="">-- Toutes les classes --</option>
          {classes.map(classData => (
            <option key={classData._id} value={classData.name}>
              {classData.name}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des classes */}
      <ul className="space-y-4">
        {classes
          .filter(classData => !selectedClass || classData.name === selectedClass)
          .map(classData => (
            <li
              key={classData._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <span className="font-medium text-lg">{classData.name}</span>
              <button
                onClick={() => handleDeleteClass(classData._id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </li>
          ))}
      </ul>
      
      {selectedClass && (
        <div className="mt-6">
          <StudentList selectedClass={selectedClass} />
        </div>
      )}
    </div>
  );
};

export default ClassList;
