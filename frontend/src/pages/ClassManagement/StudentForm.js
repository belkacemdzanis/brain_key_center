import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSave, onClose }) => {
  const [formData, setFormData] = useState(student || {});

  useEffect(() => setFormData(student || {}), [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.birthDate) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {[
        { name: 'firstName', label: 'Prénom', required: true },
        { name: 'lastName', label: 'Nom', required: true },
        { name: 'birthDate', label: 'Date de naissance', type: 'date', required: true },
        { name: 'grade', label: 'Grade' },
        { name: 'classe', label: 'Classe' }
      ].map(({ name, label, type = 'text', required }, index) => (
        <div key={index}>
          <label>{label}{required && ' *'}</label>
          <input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="button" onClick={onClose}>Annuler</button>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default StudentForm;
