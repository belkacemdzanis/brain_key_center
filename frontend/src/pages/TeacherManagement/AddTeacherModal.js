import React, { useState } from "react";

const AddTeacherModal = ({ onClose, onAddTeacher }) => {
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    employeeType: "",
    phone: "",
    email: "",
    address: "",
    monthlyPayment: "",
    paymentDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teacher.monthlyPayment || isNaN(parseFloat(teacher.monthlyPayment))) {
      alert("Veuillez entrer un salaire mensuel valide.");
      return;
    }

    onAddTeacher({ ...teacher, monthlyPayment: parseFloat(teacher.monthlyPayment) });
    setTeacher({
      firstName: "",
      lastName: "",
      employeeType: "",
      phone: "",
      email: "",
      address: "",
      monthlyPayment: "",
      paymentDate: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-6 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Ajouter un nouvel employé
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Prénom"
            value={teacher.firstName}
            onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nom de famille"
            value={teacher.lastName}
            onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type d'employé"
            value={teacher.employeeType}
            onChange={(e) => setTeacher({ ...teacher, employeeType: e.target.value })}
          />
          <input
            type="text"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Numéro de téléphone"
            value={teacher.phone}
            onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })}
          />
          <input
            type="email"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Adresse e-mail"
            value={teacher.email}
            onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
            required
          />
          <input
            type="text"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Adresse"
            value={teacher.address}
            onChange={(e) => setTeacher({ ...teacher, address: e.target.value })}
          />
          <input
            type="number"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Salaire mensuel"
            value={teacher.monthlyPayment}
            onChange={(e) => setTeacher({ ...teacher, monthlyPayment: e.target.value })}
            required
          />
          <input
            type="date"
            className="border border-indigo-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={teacher.paymentDate}
            onChange={(e) => setTeacher({ ...teacher, paymentDate: e.target.value })}
          />
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-gray-200 text-indigo-600 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 transition duration-200"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition duration-200"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;
