import React, { useState, useEffect } from 'react';

const EditTeacherModal = ({ teacher, onClose, onUpdateTeacher }) => {
  const [updatedTeacher, setUpdatedTeacher] = useState({ ...teacher });

  useEffect(() => {
    setUpdatedTeacher({ ...teacher });
  }, [teacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(updatedTeacher)) {
      onUpdateTeacher(teacher._id, updatedTeacher);
    }
  };

  const validateForm = (teacher) => {
    if (!teacher.firstName || !teacher.lastName || !teacher.email || !teacher.monthlyPayment) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Modifier Un Employé</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Prénom"
            value={updatedTeacher.firstName}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Nom de famille"
            value={updatedTeacher.lastName}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, lastName: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Type d'employé"
            value={updatedTeacher.employeeType}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, employeeType: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Numéro de téléphone"
            value={updatedTeacher.phone}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, phone: e.target.value })}
          />
          <input
            type="email"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Adresse e-mail"
            value={updatedTeacher.email}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, email: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Adresse"
            value={updatedTeacher.address}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, address: e.target.value })}
          />
          <input
            type="number"
            className="border border-indigo-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Salaire mensuel"
            value={updatedTeacher.monthlyPayment}
            onChange={(e) => setUpdatedTeacher({ ...updatedTeacher, monthlyPayment: e.target.value })}
            required
          />
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors duration-300"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white px-6 py-2 rounded-lg shadow-lg hover:from-indigo-500 hover:to-indigo-300 transition-all duration-300"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherModal;
