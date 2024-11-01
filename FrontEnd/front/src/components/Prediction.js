import React, { useState } from "react";
import "../styles/PredictionStyle.css"; // Asegúrate de importar tu CSS aquí

const PredictionPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePrediction = async () => {
    if (!inputValue) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FASTAPI_APP_URL}${inputValue}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la predicción");
      }

      // Asumiendo que la respuesta es un JSON con { prediction: "resultado" }
      const data = await response.json();
      setPrediction(data.prediction); // o manejar como una imagen si es necesario
    } catch (err) {
      setError(err.message);
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
          {prediction && (
            <div className="mt-4 text-center">
              <img
                src={prediction}
                alt="Predicción"
                className="max-w-full h-auto" // Ajusta el tamaño según sea necesario
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
