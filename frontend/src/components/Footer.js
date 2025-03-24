import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-6 border-t border-yellow-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo et Nom */}
        <div className="flex items-center space-x-3 md:mr-40">
          <img src="/images/brain_keyy-removebg-preview.png" alt="Logo" className="w-14 h-14" />
          <span className="text-xl font-semibold text-yellow-400" style={{ fontFamily: "'Cinzel', serif" }}>
            Brain_Key_Center 
          </span>
        </div>

        {/* Liens de navigation */}
        <nav className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-yellow-400 transition duration-300">Accueil</Link>
          <Link to="/dashboard" className="hover:text-yellow-400 transition duration-300">Tableau de bord</Link>
          <Link to="/students" className="hover:text-yellow-400 transition duration-300">Étudiants</Link>
          <Link to="/teachers" className="hover:text-yellow-400 transition duration-300">Enseignants</Link>
          <Link to="/courses" className="hover:text-yellow-400 transition duration-300">Cours</Link>
          <Link to="/classes" className="hover:text-yellow-400 transition duration-300">Classes</Link>
          <Link to="/attendance" className="hover:text-yellow-400 transition duration-300">Présence</Link>
          <Link to="/grades" className="hover:text-yellow-400 transition duration-300">Notes</Link>
          <Link to="/payment" className="hover:text-yellow-400 transition duration-300">Paiements</Link>
          <Link to="/inventory" className="hover:text-yellow-400 transition duration-300">Inventaire</Link>
        </nav>

        {/* Adresse de l'école */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="text-sm text-gray-500">📍 Adresse : Brain key center RN26 6006 Tazmalt, Algeria</p>
          <p className="text-sm text-gray-500">📞 Téléphone : +213 675 45 08 64</p>
          <p className="text-sm text-gray-500">📧 Email : Brainkey62@gmail.com</p>
        </div>
      </div>

      {/* Droits d'auteur */}
      <div className="text-center mt-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Brain Key Center. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
