import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500 mb-4">🚫 Accès interdit</h1>
            <p className="text-gray-700 mb-6">Vous n'avez pas la permission d'accéder à cette page.</p>
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default Unauthorized;
