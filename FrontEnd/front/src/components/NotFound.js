// src/pages/NotFound.js
import React from "react";
import ElMenosChocoano from "../images/ElMenosChocoano.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src={ElMenosChocoano}
        alt="Error"
        className="w-1/2 h-auto mb-4 rounded shadow-lg"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-2">
        ¡Vaya! Algo salió mal.
      </h1>
      <p className="text-lg text-gray-700">
        No encontramos la página que buscabas. Por favor, verifica la URL o
        vuelve a la página de inicio.
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Volver a Inicio
      </a>
    </div>
  );
};

export default NotFound;
