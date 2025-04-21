import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentReport = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [upcomingPaymentStudents, setUpcomingPaymentStudents] = useState([]);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/students/count`);
        setStudentCount(response.data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'étudiants:', error);
      }
    };
  
    const fetchUpcomingPaymentStudents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/students/upcoming-payments`);
        setUpcomingPaymentStudents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des étudiants proches de leur paiement:', error);
      }
    };
  
    // Call the functions inside useEffect
    fetchStudentCount();
    fetchUpcomingPaymentStudents();
  }, []); // Empty dependency array to run on mount
  
 

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-4 rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Rapport des étudiants</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Nombre d&apos;étudiants : <span className="text-indigo-600">{studentCount}</span>
        </p>
        <h3 className="text-xl font-semibold text-gray-800">Étudiants avec un paiement imminent</h3>
        {upcomingPaymentStudents.length > 0 ? (
          <ul className="space-y-2">
            {upcomingPaymentStudents.map(student => (
              <li
                key={student._id}
                className="p-2 bg-gray-50 rounded-lg shadow-sm hover:bg-indigo-50 transition duration-200"
              >
                <p className="text-sm text-indigo-700">
                  {student.firstName} {student.lastName} - 
                  <span className="text-gray-600"> Prochain paiement : </span>
                  <span className="text-indigo-600">
                    {new Date(student.nextPaymentDate).toLocaleDateString('fr-CA')}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Aucun paiement imminent.</p>
        )}
      </div>
    </div>
  );
};

export default StudentReport;
