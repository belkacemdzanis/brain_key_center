import React from 'react';
import Dashboard from './Dashboard';
import PaymentStatistics from './PaymentStatistics';
import StudentPayments from './StudentPayments';
  
const PaymentManagement = () => {
  const students = [
    { id: 1, name: 'محمد', class: 'الصف الأول', dueAmount: 500, dueDate: '2024-12-05' },
    { id: 2, name: 'علي', class: 'الصف الثاني', dueAmount: 450, dueDate: '2024-12-10' },
    // Additional student data
  ];

   return (
    <div className="p-6 space-y-8">
      <Dashboard totalPayments="5000" pendingPayments="3" staffPaid="5" />
     
     
      <StudentPayments />
        <section className="bg-white p-2 rounded-md shadow-md">
        <PaymentStatistics studentsPayments={1500} teachersPayments={4000} />
      </section>
    </div>
  );
};

export default PaymentManagement;
