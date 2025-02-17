import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function StatisticsChart() {
  // بيانات الدفعات الشهرية للطلاب والأساتذة
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Students Payments",
        data: [2000, 3000, 2500, 3200, 4000, 3800],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Teachers Salaries",
        data: [4000, 4000, 4000, 4000, 4000, 4000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // بيانات النسب المئوية للمدفوعات
  const pieData = {
    labels: ["Students Payments", "Teachers Salaries"],
    datasets: [
      {
        data: [18000, 24000],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الرسم البياني العمودي */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Monthly Payments Comparison</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* الرسم البياني الدائري */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Overall Payments Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default StatisticsChart;
