import React, { useState } from 'react';
import axios from 'axios';

const AddClassModal = ({ toggleModal, setClasses }) => {
  const [className, setClassName] = useState('');

  const handleAddClass = async () => {
    try {
      const response = await axios.post('${process.env.REACT_APP_API_URL}/classes', { name: className });
      setClasses((prevClasses) => [...prevClasses, response.data]);
      toggleModal(); // Fermer le modal après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la classe', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Ajouter une classe</h2>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Nom de la classe"
          className="border border-gray-300 p-2 w-full rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddClass}
            className=" bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-2 px-4 rounded-md mr-2"
          >
            Ajouter
          </button>
          <button
            onClick={toggleModal}
            className="bg-gray-300 py-2 px-4 rounded-md"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClassModal;
