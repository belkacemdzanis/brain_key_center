// src/pages/TeacherManagement/TeacherManagement.js

import React from 'react';
import TeacherList from './TeacherList';
import TeacherReport from './TeacherReport';

const TeacherManagement = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800"> Gestion Des Employés </h1>
      <TeacherList />
      <TeacherReport />
    </div>
  );
};

export default TeacherManagement;
