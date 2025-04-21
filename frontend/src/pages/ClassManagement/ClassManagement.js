import React, { useEffect, useState } from 'react';
import AddClassModal from './AddClassModal';
import ClassList from './ClassList';
import StudentList from './StudentList';
import axios from 'axios';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/classes`);
        setClasses(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des classes', error);
      }
    };
    fetchClasses();
  }, []);

  const handleClassSelect = (classId) => {
    const selected = classes.find((classItem) => classItem._id === classId);
    setSelectedClass(selected);
  };

  const toggleAddClassModal = () => {
    setShowAddClassModal(!showAddClassModal);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Gestion des Classes</h1>

      <button
        onClick={toggleAddClassModal}
        className=" bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-2 px-4 rounded-md mb-4"
      >
        Ajouter une nouvelle classe
      </button>

      {showAddClassModal && <AddClassModal toggleModal={toggleAddClassModal} setClasses={setClasses} />}

      <ClassList classes={classes} onClassSelect={handleClassSelect} />

      {selectedClass && <StudentList classId={selectedClass._id} students={selectedClass.students} />}
    </div>
  );
};

export default ClassManagement;
