import React, { useState } from "react";
import CoursesStudent from "./CoursesStudent";
import CoursesTeacher from "./CoursesTeacher";

const CoursesManagement = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-6 bg-gray-100">
        Gestion des emplois du temps
      </h1>

      {/* Onglets */}
      <div className="flex justify-center bg-gray-100 py-4 space-x-4 rtl:space-x-reverse">
        <button
          className={`px-6 py-2 font-semibold rounded ${
            activeTab === "students" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Emplois du temps des élèves
        </button>
        <button
          className={`px-6 py-2 font-semibold rounded ${
            activeTab === "teachers" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          Emplois du temps des enseignants
        </button>
      </div>

      {/* Affichage de l'onglet actif */}
      <div className="flex-grow">
        {activeTab === "students" && (
          <div className="h-full">
            <h2 className="text-2xl font-semibold mb-6 text-center bg-white py-4">
              Emplois du temps des élèves
            </h2>
            <div className="h-full overflow-y-auto bg-white shadow-md rounded-lg p-6">
              <CoursesStudent />
            </div>
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="h-full">
            <h2 className="text-2xl font-semibold mb-6 text-center bg-white py-4">
              Emplois du temps des enseignants
            </h2>
            <div className="h-full overflow-y-auto bg-white shadow-md rounded-lg p-6">
              <CoursesTeacher />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesManagement;
