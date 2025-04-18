import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const navigate = useNavigate();

  useEffect(() => {
    setIsOnline(navigator.onLine); // Mise à jour immédiate de l'état en fonction de la connexion

    const interval = setInterval(() => {
      setShowLogo((prev) => !prev);
    }, 5000);

    const handleOnlineStatus = () => setIsOnline(true);
    const handleOfflineStatus = () => setIsOnline(false);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      localStorage.removeItem("userRole");
      setUserRole(null);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-opacity-70 backdrop-blur-md p-4 shadow-md fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-500 text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition duration-300 flex items-center">
            {showLogo ? (
              <div className="bg-black p-2 rounded-full flex justify-center items-center">
                <img src="/images/brain_keyy-removebg-preview.png" alt="Logo" className="w-20 h-20 object-contain" />
              </div>
            ) : (
              <span style={{ fontFamily: "Lora, serif", fontSize: "3rem", fontWeight: "500", fontStyle: "normal" }}>
                Brain Key Center
              </span>
            )}
          </Link>
        </div>

        {/* Liens */}
        <div className="hidden sm:flex space-x-4">
          <Link
            to="/dashboard"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Tableau de bord
          </Link>
          <Link
            to="/students"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Étudiants
          </Link>
          <Link
            to="/teachers"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Enseignants
          </Link>
          <Link
            to="/courses"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Cours
          </Link>
          <Link
            to="/classes"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Classes
          </Link>
          <Link
            to="/attendance"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Présence
          </Link>
          <Link
            to="/grades"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Notes
          </Link>
          <Link
            to="/payment"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Paiements
          </Link>
          <Link
            to="/inventory"
            className="text-gray-500 hover:text-gray-300 transition duration-300"
          >
            Inventaire
          </Link>
        </div>

        {/* État connexion + Auth */}
        <div className="flex items-center space-x-4">
          <span className={isOnline ? "text-green-500" : "text-red-500"}>
            {isOnline ? "Connecté" : "Hors ligne"}
          </span>

          {userRole ? (
            <>
              <span className="text-gray-500">({userRole})</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
