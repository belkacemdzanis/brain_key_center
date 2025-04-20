import React, { useState, useEffect } from "react";
import axios from "axios";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // جلب البيانات من API
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/teachers`); // الرابط إلى مسار الـ backend
        setTeachers(response.data); // تخزين البيانات في الحالة
              } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teachers</h1>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td className="border px-4 py-2">
                {teacher.firstName} {teacher.lastName}
              </td>
              <td className="border px-4 py-2">{teacher.department}</td>
              <td className="border px-4 py-2">${teacher.salary}</td>
              <td className="border px-4 py-2">{teacher.lastPayment || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
