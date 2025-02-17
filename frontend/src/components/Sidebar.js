import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-yellow-600 bg-opacity-70 h-screen w-48 fixed top-0 left-0 p-4 shadow-lg backdrop-blur-md flex flex-col items-start space-y-4 pt-16">
      {/* Titre ou Logo */}
      <div className="text-white text-xl font-bold mb-6">
        <Link to="/" className="hover:text-gray-300 transition duration-300">
          Brain Key Center
        </Link>
      </div>

      {/* Liens de navigation */}
      <nav className="flex flex-col space-y-3">
        <Link to="/dashboard" className="text-white hover:text-gray-300 transition duration-300">
          Tableau de bord
        </Link>
        <Link to="/students" className="text-white hover:text-gray-300 transition duration-300">
          Étudiants
        </Link>
        <Link to="/teachers" className="text-white hover:text-gray-300 transition duration-300">
          Enseignants
        </Link>
        <Link to="/courses" className="text-white hover:text-gray-300 transition duration-300">
          Cours
        </Link>
        <Link to="/classes" className="text-white hover:text-gray-300 transition duration-300">
          Classes
        </Link>
        <Link to="/attendance" className="text-white hover:text-gray-300 transition duration-300">
          Présence
        </Link>
        <Link to="/grades" className="text-white hover:text-gray-300 transition duration-300">
          Notes
        </Link>
        <Link to="/payment" className="text-white hover:text-gray-300 transition duration-300">
          Paiements
        </Link>
        <Link to="/inventory" className="text-white hover:text-gray-300 transition duration-300">
          Inventaire
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
