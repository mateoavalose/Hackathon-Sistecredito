import React, { useState } from "react";
import "../styles/PredictionStyle.css"; // Asegúrate de importar tu CSS aquí

const PredictionPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePrediction = async () => {
    if (!inputValue) return;

    // Construye la URL de la API
    const apiUrl = `${process.env.REACT_APP_FASTAPI_APP_URL}${inputValue}`;

    // Abre la URL en una nueva pestaña
    window.open(apiUrl, "_blank");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        // Si la respuesta no es OK, manejamos el error
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la predicción");
      }

      // Aquí se asume que la respuesta es la imagen en sí
      const imageBlob = await response.blob(); // Obtiene la imagen como un Blob
      const imageUrl = URL.createObjectURL(imageBlob); // Crea una URL para el Blob

      // Abre la URL de la imagen en una nueva pestaña
      window.open(imageUrl, "_blank");
    } catch (err) {
      // En lugar de mostrar el mensaje "Failed to fetch", puedes establecer un error genérico
      if (err.message !== "Failed to fetch") {
        setError("Error al realizar la solicitud. Inténtalo de nuevo."); // Mensaje genérico
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-animated">
      <div className="absolute inset-0">
        <div className="wave"></div>
        <div className="wave" style={{ animationDelay: "0.5s" }}></div>
        <div className="wave" style={{ animationDelay: "1s" }}></div>
        <div className="wave" style={{ animationDelay: "1.5s" }}></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Predicción Espectacular
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ingresa tu dato aquí"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={handlePrediction}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Hacer Predicción
          </button>
          {loading && (
            <p className="mt-4 text-center text-blue-600">Cargando...</p>
          )}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
