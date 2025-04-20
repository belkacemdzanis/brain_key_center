import React, { useState, useEffect } from "react";
import axios from "axios";

const AddStudentModal = ({ onClose, onAddStudent, onUpdateStudent, selectedStudent }) => {
  const [firstName, setFirstName] = useState(selectedStudent?.firstName || "");
  const [lastName, setLastName] = useState(selectedStudent?.lastName || "");
  const [grade, setGrade] = useState(selectedStudent?.grade || "");
  const [classe, setClasse] = useState(selectedStudent?.classe || "");
  const [contact, setContact] = useState(selectedStudent?.contact || "");
  const [birthDate, setBirthDate] = useState(selectedStudent?.birthDate || "");
  const [paymentAmount, setPaymentAmount] = useState(selectedStudent?.paymentAmount || "");
  const [paymentMethod, setPaymentMethod] = useState(selectedStudent?.paymentMethod || "");
  const [paymentDate, setPaymentDate] = useState(selectedStudent?.paymentDate || "");
  const [nextPaymentDate, setNextPaymentDate] = useState(selectedStudent?.nextPaymentDate || "");
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get("${process.env.REACT_APP_API_URL}/classes")
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des classes", error));
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setFirstName(selectedStudent.firstName || "");
      setLastName(selectedStudent.lastName || "");
      setGrade(selectedStudent.grade || "");
      setClasse(selectedStudent.classe || "");
      setContact(selectedStudent.contact || "");
      setBirthDate(selectedStudent.birthDate || "");
      setPaymentAmount(selectedStudent.paymentAmount || "");
      setPaymentMethod(selectedStudent.paymentMethod || "");
      setPaymentDate(selectedStudent.paymentDate || "");
      setNextPaymentDate(selectedStudent.nextPaymentDate || "");
    }
  }, [selectedStudent]);

  const handleSubmit = () => {
    if (!firstName || !lastName || !grade || !classe || !contact || !birthDate || !paymentAmount || !paymentMethod || !paymentDate || !nextPaymentDate) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    const student = { firstName, lastName, grade, classe, contact, birthDate, paymentAmount, paymentMethod, paymentDate, nextPaymentDate };

    selectedStudent ? onUpdateStudent({ ...student, _id: selectedStudent._id }) : onAddStudent(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-3 text-center text-indigo-600">Ajouter/Modifier Étudiant</h2>
        {error && <p className="text-xs text-red-600 mb-3 text-center">{error}</p>}
        
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-2 border rounded text-sm" />
          <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-2 border rounded text-sm" />
          <input type="text" placeholder="Classe" value={grade} onChange={(e) => setGrade(e.target.value)} className="p-2 border rounded text-sm" />
          <select value={classe} onChange={(e) => setClasse(e.target.value)} className="p-2 border rounded text-sm">
            <option value="">Classe</option>
            {classes.map((c) => (
              <option key={c.id || c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} className="p-2 border rounded text-sm col-span-2" />
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="p-2 border rounded text-sm col-span-2" />
          <input type="number" placeholder="Montant" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="p-2 border rounded text-sm" />
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="p-2 border rounded text-sm">
            <option value="">Paiement</option>
            <option value="En espèces">Espèces</option>
            <option value="Carte">Carte</option>
            <option value="Pas encore payé">Non payé</option>
          </select>
          <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="p-2 border rounded text-sm" />
          <input type="date" value={nextPaymentDate} onChange={(e) => setNextPaymentDate(e.target.value)} className="p-2 border rounded text-sm" />
        </div>

        <div className="flex justify-end space-x-2 mt-3">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded text-sm">Annuler</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-indigo-600 text-white hover:bg-indigo-700 rounded text-sm">OK</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
