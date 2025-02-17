import React from 'react';
import Attendance from './Attendance';
import AttendanceReport from './AttendanceReport';

const AttendanceManagement = () => {
  return (
    
    <div>
     <h1 className="text-3xl font-bold text-gray-800"> Gestion des présences </h1>

      <Attendance />
      <AttendanceReport />

 
      </div>
  );
};

export default AttendanceManagement;
