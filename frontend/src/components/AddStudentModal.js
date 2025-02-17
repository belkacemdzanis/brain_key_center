import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudentModal = ({ onClose, onAddStudent, onUpdateStudent, selectedStudent }) => {
  const [firstName, setFirstName] = useState(selectedStudent?.firstName || '');
  const [lastName, setLastName] = useState(selectedStudent?.lastName || '');
  const [grade, setGrade] = useState(selectedStudent?.grade || '');
  const [classe, setClasse] = useState(selectedStudent?.classe || '');
  const [contact, setContact] = useState(selectedStudent?.contact || '');
  const [birthDate, setBirthDate] = useState(selectedStudent?.birthDate || '');
  const [paymentAmount, setPaymentAmount] = useState(selectedStudent?.paymentAmount || '');
  const [paymentMethod, setPaymentMethod] = useState(selectedStudent?.paymentMethod || '');
  const [paymentDate, setPaymentDate] = useState(selectedStudent?.paymentDate || '');
  const [nextPaymentDate, setNextPaymentDate] = useState(selectedStudent?.nextPaymentDate || '');
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des classes", error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setFirstName(selectedStudent.firstName || '');
      setLastName(selectedStudent.lastName || '');
      setGrade(selectedStudent.grade || '');
      setClasse(selectedStudent.classe || '');
      setContact(selectedStudent.contact || '');
      setBirthDate(selectedStudent.birthDate || '');
      setPaymentAmount(selectedStudent.paymentAmount || '');
      setPaymentMethod(selectedStudent.paymentMethod || '');
      setPaymentDate(selectedStudent.paymentDate || '');
      setNextPaymentDate(selectedStudent.nextPaymentDate || '');
    }
  }, [selectedStudent]);

  const isNextPaymentDueSoon = (nextPaymentDate) => {
    const currentDate = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const timeDiff = paymentDate - currentDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  };

  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !grade ||
      !classe ||
      !contact ||
      !birthDate ||
      !paymentAmount ||
      !paymentMethod ||
      !paymentDate ||
      !nextPaymentDate
    ) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    const student = {
      firstName,
      lastName,
      grade,
      classe,
      contact,
      birthDate,
      paymentAmount,
      paymentMethod,
      paymentDate,
      nextPaymentDate,
    };

    if (selectedStudent) {
      onUpdateStudent({ ...student, _id: selectedStudent._id });
    } else {
      onAddStudent(student);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600">Ajouter ou modifier un étudiant</h2>
        {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="mb-3">
          <input
            type="text"
            placeholder="Classe"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionner la classe</option>
          {classes.map((classItem) => (
            <option key={classItem.id || classItem.name} value={classItem.name}>
              {classItem.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Montant du paiement"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionner le mode de paiement</option>
          <option value="En espèces">En espèces</option>
          <option value="Carte">Carte</option>
          <option value="Pas encore payé">Pas encore payé</option>
        </select>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={nextPaymentDate}
          onChange={(e) => setNextPaymentDate(e.target.value)}
          className={`w-full p-2 mb-3 border ${isNextPaymentDueSoon(nextPaymentDate) ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">Annuler</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg">Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
