import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-6">
        Bienvenido a la Aplicación
      </h1>
      <div className="flex space-x-4">
        <Link to="/CRUD">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Inventario
          </button>
        </Link>
        <Link to="/prediction">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Predicciones
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
