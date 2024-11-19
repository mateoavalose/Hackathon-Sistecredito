import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/animations/React.json"; // Asegúrate de que la ruta sea correcta

export const HomePage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, // La animación se reproduce automáticamente
    animationData: animationData, // Animación importada
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-800">
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
      <div className="relative z-10 text-center p-16 bg-white rounded-xl shadow-xl w-[450px] max-w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome</h1>
        <p className="text-lg text-gray-500 mb-8">
          Manage your products and explore predictions with ease and precision.
        </p>
        <div className="flex justify-between gap-4">
          <Link to="/productManager">
            <button className="w-full py-4 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Products
            </button>
          </Link>
          <Link to="/prediction">
            <button className="w-full py-4 px-8 bg-gray-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Prediction
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
