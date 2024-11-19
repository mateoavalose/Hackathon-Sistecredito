import { useState } from "react";
import axios from "axios";

export const DeleteProduct = () => {
  const [productId, setProductId] = useState("");

  const deleteProduct = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`);
      if (response.status === 200) {
        alert("Producto eliminado");
        setProductId(""); // Limpiar el input después de la eliminación
      } else {
        alert(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      {/* Caja con estilos más anchos */}
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Eliminar Producto
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="productId"
              className="block text-white font-semibold mb-2"
            >
              Ingrese el ID del Producto a Eliminar
            </label>
            <input
              type="text"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="ID del producto"
              className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            onClick={deleteProduct}
            className="w-full py-4 px-8 bg-red-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Eliminar Producto
          </button>
        </div>
      </div>
    </div>
  );
};
