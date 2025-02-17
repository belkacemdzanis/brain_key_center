import React from "react";

const GradesPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-black" 
      style={{ backgroundImage: "url('/images/grades-background.png')" }}>
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center shadow-lg">
        <img src="/images/brain_keyy-removebg-preview.png" alt="Grades Logo" className="w-40 h-40 mx-auto mb-4 rounded-full" />
        <h1 className="text-4xl font-bold text-yellow-400" style={{ fontFamily: "'Playfair Display', serif" }}>
          Grades
        </h1>
        <p className="text-lg text-gray-300 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Suivez et gérez les notes avec précision.
        </p>
      </div>
    </div>
  );
};

export default GradesPage;
