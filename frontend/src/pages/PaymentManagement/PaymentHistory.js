import React from "react";

function Students() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Students</h1>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Class</th>
            <th className="border px-4 py-2">Amount Due</th>
            <th className="border px-4 py-2">Next Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">John Doe</td>
            <td className="border px-4 py-2">10th</td>
            <td className="border px-4 py-2">$200</td>
            <td className="border px-4 py-2">2024-12-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Students;
