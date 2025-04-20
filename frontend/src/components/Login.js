import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("public");
  const [adminToken, setAdminToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateEmail(email)) return setError("Email invalide");
    if (password.length < 6) return setError("Le mot de passe doit contenir au moins 6 caractères");
    if (password !== confirmPassword) return setError("Les mots de passe ne correspondent pas");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${role}/register`, {
        email,
        password,
        role,
        adminToken: role === "admin" ? adminToken : undefined,
      });

      setSuccess("Inscription réussie !");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateEmail(email)) return setError("Email invalide");
    if (password.length < 6) return setError("Le mot de passe doit contenir au moins 6 caractères");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${role}/login`, {
        email,
        password,
      });

      localStorage.setItem("userRole", response.data.role);
      setSuccess("Connexion réussie !");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black border border-yellow-500 p-8 rounded-xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src="/images/brainkey.jpg" alt="brainkey Logo" className="w-20 h-20 rounded-full border border-yellow-500" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-yellow-500 mb-6">
          {isRegistering ? "Inscription" : "Connexion"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          <div>
            <label className="block text-yellow-500">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-yellow-500 bg-black text-white rounded focus:ring focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-yellow-500">Mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-yellow-500 bg-black text-white rounded focus:ring focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegistering && (
            <>
              <div>
                <label className="block text-yellow-500">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-yellow-500 bg-black text-white rounded focus:ring focus:ring-yellow-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-yellow-500">Type de compte</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-yellow-500 bg-black text-white rounded focus:ring focus:ring-yellow-500"
                >
                  <option value="public">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              {role === "admin" && (
                <div>
                  <label className="block text-yellow-500">Clé d'inscription admin</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-yellow-500 bg-black text-white rounded focus:ring focus:ring-yellow-500"
                    placeholder="Entrez la clé secrète"
                    value={adminToken}
                    onChange={(e) => setAdminToken(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded-xl hover:bg-yellow-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Chargement..." : isRegistering ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => setIsRegistering(!isRegistering)} className="text-yellow-500 hover:text-yellow-600">
            {isRegistering ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
