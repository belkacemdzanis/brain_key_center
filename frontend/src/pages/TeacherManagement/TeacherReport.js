// src/pages/TeacherManagement/TeacherReport.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherReport = () => {
  const [teachers, setTeachers] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/teachers`) // استخدم backticks هنا
      .then(response => {
        const data = response.data;
        setTeachers(data);
  
        const count = data.length;
        const totalPayment = data.reduce((sum, teacher) => {
          const payment = parseFloat(teacher.monthlyPayment) || 0; // Convert to number or set 0 if not available
          return sum + payment;
        }, 0);
  
        setEmployeeCount(count);
        setTotalMonthlyPayment(totalPayment);
      })
      .catch(error => console.error('Erreur de chargement:', error));
  }, []);
  

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-8 rounded-lg shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Rapport Des Employé</h2>
      <div className="space-y-4 text-white text-lg">
        <div className="flex justify-between">
          <span>Nombre d'employés :</span>
          <span>{employeeCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Total paiement mensuel :</span>
          <span>{totalMonthlyPayment.toFixed(2)} DZD</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherReport;
