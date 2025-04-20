import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("${process.env.REACT_APP_API_URL}/payments");
        setPayments(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des paiements.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateStatistics = () => {
    const studentPayments = payments.filter((payment) => payment.type === "Student");
    const teacherPayments = payments.filter((payment) => payment.type === "Teacher");

    const totalPayments = payments.reduce((sum, payment) => sum + payment.paymentAmount, 0);
    const totalStudentPayments = studentPayments.reduce(
      (sum, payment) => sum + payment.paymentAmount,
      0
    );
    const totalTeacherPayments = teacherPayments.reduce(
      (sum, payment) => sum + payment.paymentAmount,
      0
    );

    const averagePayment = payments.length
      ? (totalPayments / payments.length).toFixed(2)
      : 0;
    const averageStudentPayment = studentPayments.length
      ? (totalStudentPayments / studentPayments.length).toFixed(2)
      : 0;
    const averageTeacherPayment = teacherPayments.length
      ? (totalTeacherPayments / teacherPayments.length).toFixed(2)
      : 0;

    const profit = totalStudentPayments - totalTeacherPayments;

    return {
      totalPayments,
      totalStudentPayments,
      totalTeacherPayments,
      averagePayment,
      averageStudentPayment,
      averageTeacherPayment,
      profit,
    };
  };

  const {
    totalPayments,
    totalStudentPayments,
    totalTeacherPayments,
    averagePayment,
    averageStudentPayment,
    averageTeacherPayment,
    profit,
  } = calculateStatistics();

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Statistiques des Paiements</h1>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 p-4 rounded">
              <h2 className="text-xl font-semibold">Total des paiements</h2>
              <p className="text-2xl font-bold">{totalPayments} DA</p>
            </div>

            <div className="bg-green-100 p-4 rounded">
              <h2 className="text-xl font-semibold">Paiements des Étudiants</h2>
              <p className="text-2xl font-bold">{totalStudentPayments} DA</p>
              <p className="text-sm">Moyenne: {averageStudentPayment} DA</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded">
              <h2 className="text-xl font-semibold">Paiements des Enseignants</h2>
              <p className="text-2xl font-bold">{totalTeacherPayments} DA</p>
              <p className="text-sm">Moyenne: {averageTeacherPayment} DA</p>
            </div>

            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold">Paiement Moyen</h2>
              <p className="text-2xl font-bold">{averagePayment} DA</p>
            </div>

            <div className="bg-purple-100 p-4 rounded">
              <h2 className="text-xl font-semibold">Profit</h2>
              <p className="text-2xl font-bold">{profit} DA</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Dashboard;