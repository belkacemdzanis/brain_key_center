import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icônes pour le menu mobile
import { FaUserCircle } from "react-icons/fa"; // Icône utilisateur

const Navbar = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleLogo = setInterval(() => setShowLogo((prev) => !prev), 5000);

    const handleOnlineStatus = () => setIsOnline(true);
    const handleOfflineStatus = () => setIsOnline(false);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      clearInterval(toggleLogo);
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
  <div className="container mx-auto px-4 flex justify-between items-center gap-x-8">
    {/* Logo */}
    <div className="text-gray-300 text-2xl font-bold">
      <Link to="/" className="hover:text-gray-300 transition duration-300 flex items-center">
        {showLogo ? (
          <div className="bg-black p-2 rounded-full flex justify-center items-center">
            <img src="/images/brain_keyy-removebg-preview.png" alt="Logo" className="w-16 h-16 object-contain" />
          </div>
        ) : (
          <span className="font-lora text-3xl font-medium">Brain_Key_Center</span>
        )}
      </Link>
    </div>

    {/* MENU BURGER (MOBILE) */}
    <button className="sm:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <X size={30} /> : <Menu size={30} />}
    </button>

    {/* LIENS DE NAVIGATION (DESKTOP) */}
    <div className="hidden sm:flex space-x-6 text-gray-400 font-medium">
      <Link to="/dashboard" className="hover:text-gray-900">Tableau de bord</Link>
      <Link to="/students" className="hover:text-gray-900">Étudiants</Link>
      <Link to="/teachers" className="hover:text-gray-900">Enseignants</Link>
      <Link to="/courses" className="hover:text-gray-900">Cours</Link>
      <Link to="/classes" className="hover:text-gray-900">Classes</Link>
      <Link to="/attendance" className="hover:text-gray-900">Présence</Link>
      <Link to="/grades" className="hover:text-gray-900">Notes</Link>
      {userRole === "admin" && (
        <>
          <Link to="/payment" className="hover:text-gray-900">Paiements</Link>
          <Link to="/inventory" className="hover:text-gray-900">Inventaire</Link>
        </>
      )}
    </div>

    {/* UTILISATEUR + STATUT */}
    <div className="flex items-center space-x-4">
      <span className={`transition-all duration-500 text-sm ${isOnline ? "text-green-500" : "text-red-500"}`}>
        {isOnline ? "Connecté" : "Hors ligne"}
      </span>

      {userRole ? (
        <div className="relative group">
          <button className="flex items-center space-x-2 text-gray-700">
            <FaUserCircle size={25} />
            <span>{userRole}</span>
          </button>

          {/* MENU UTILISATEUR */}
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
            <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Mon profil</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Se déconnecter
            </button>
          </div>
        </div>
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
