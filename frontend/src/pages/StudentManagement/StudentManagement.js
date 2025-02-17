import React from 'react';
import StudentList from './StudentList';
import StudentReport from './StudentReport';
 
const StudentManagement = () => {
  return (
    
    <div>
     <h1 className="text-3xl font-bold text-gray-800"> Gestion Des Étudiants </h1>

      <StudentList />
      < StudentReport/>

      </div>
  );
};

export default StudentManagement;
