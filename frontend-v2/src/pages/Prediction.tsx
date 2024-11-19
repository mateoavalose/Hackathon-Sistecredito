import { useState } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../assets/animations/Engine.json"; // Asegúrate de que la ruta sea correcta

export const Prediction = () => {
  const [productId, setProductId] = useState("");
  const [showPng, setShowPng] = useState(false);
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPrediction = async () => {
    const API_URL = import.meta.env.VITE_FASTAPI_URL;
    setErrorMessage("");
    try {
      const response = await axios.get(`${API_URL}/predict/${productId}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/png" });

      // Usar FileReader para convertir el Blob a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImage(base64data);
        setShowPng(true);
      };
      reader.readAsDataURL(blob);
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrorMessage("Producto no encontrado");
      } else if (error.response.status === 500) {
        const decoder = new TextDecoder("utf-8");
        const jsonString = decoder.decode(error.response.data);
        const errorData = JSON.parse(jsonString);
        setErrorMessage(errorData.detail);
      } else {
        setErrorMessage(
          "Ocurrió un error inesperado. Por favor, inténtelo más tarde."
        );
      }
      console.error(error);
      setShowPng(false);
      setImage("");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true, // La animación se reproduce automáticamente
    animationData: animationData, // Animación importada
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex justify-center items-center p-6">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
        style={{
          pointerEvents: "none", // Deshabilitar interacción con el fondo
          width: "100vw", // Ancho completo de la ventana
          height: "100vh", // Alto completo de la ventana
        }}
      >
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
          style={{
            objectFit: "cover", // Asegura que la animación cubra toda el área sin perder proporción
            cursor: "none", // Evitar que el cursor cambie
          }}
          isPaused={false} // Asegura que la animación no se pause
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-xl bg-white bg-opacity-90 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Predicción del Producto
        </h1>

        {/* Formulario de búsqueda */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ingrese el ID del producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button
            onClick={fetchPrediction}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md font-semibold text-lg"
          >
            Buscar producto
          </button>
        </div>

        {/* Mensajes de error */}
        {errorMessage && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            {errorMessage}
          </p>
        )}

        {/* Mostrar la imagen de predicción */}
        {showPng && (
          <div className="mt-6 text-center">
            <img
              src={image}
              alt="Prediction"
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};
