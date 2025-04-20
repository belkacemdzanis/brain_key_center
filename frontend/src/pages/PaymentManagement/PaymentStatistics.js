import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const PaymentStatistics = () => {
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

    const totalStudentPayments = studentPayments.reduce(
      (sum, payment) => sum + payment.paymentAmount,
      0
    );
    const totalTeacherPayments = teacherPayments.reduce(
      (sum, payment) => sum + payment.paymentAmount,
      0
    );

    const profit = totalStudentPayments - totalTeacherPayments;

    return {
      totalStudentPayments,
      totalTeacherPayments,
      profit,
    };
  };

  const groupPaymentsByMonth = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("fr-FR", { month: "long" }));
    const studentMonthlyTotals = new Array(12).fill(0);
    const teacherMonthlyTotals = new Array(12).fill(0);

    payments.forEach((payment) => {
      const monthIndex = new Date(payment.paymentDate).getMonth();
      if (payment.type === "Student") {
        studentMonthlyTotals[monthIndex] += payment.paymentAmount;
      } else if (payment.type === "Teacher") {
        teacherMonthlyTotals[monthIndex] += payment.paymentAmount;
      }
    });

    return { months, studentMonthlyTotals, teacherMonthlyTotals };
  };

  const { totalStudentPayments, totalTeacherPayments, profit } = calculateStatistics();

  const { months, studentMonthlyTotals, teacherMonthlyTotals } = groupPaymentsByMonth();

  const chartData = {
    labels: ["Étudiants", "Enseignants"],
    datasets: [
      {
        data: [totalStudentPayments, totalTeacherPayments],
        backgroundColor: ["#42A5F5", "#FFA726"],
        hoverBackgroundColor: ["#1E88E5", "#FB8C00"],
      },
    ],
  };

  const combinedBarChartData = {
    labels: months,
    datasets: [
      {
        label: "Étudiants",
        data: studentMonthlyTotals,
        backgroundColor: "#42A5F5",
      },
      {
        label: "Enseignants",
        data: teacherMonthlyTotals,
        backgroundColor: "#FFA726",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Statistiques des Paiements</h1>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Répartition des paiements</h2>
          <div className="w-5/6 mx-auto">
            <Pie data={chartData} options={{ maintainAspectRatio: false }} />
          </div>

          <div className="mt-9">
            <h2 className="text-xl font-semibold text-center mb-4">Paiements par mois</h2>
            <div className="w-7/9 mx-auto">
              <Bar data={combinedBarChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="mt-8 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold text-center mb-4">Statistiques supplémentaires</h2>
            <p className="text-center text-lg font-medium">Profit : {profit} DA</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStatistics;
