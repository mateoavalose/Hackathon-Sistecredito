import { useState } from "react";
import { ProductForm } from "../components/ProductForm";

export const ModifyProduct = () => {
  const [productId, setProductId] = useState("");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      {/* Aumenté el max-width para hacerlo más ancho */}
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Modificar Producto
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="productId"
              className="block text-white font-semibold mb-2"
            >
              Ingrese el ID del Producto
            </label>
            <input
              type="text"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="ID del producto"
              className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="w-full py-4 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Buscar Producto
          </button>
        </div>

        {showForm && (
          <div className="mt-8">
            <ProductForm isCreating={false} productIdToEdit={productId} />
          </div>
        )}
      </div>
    </div>
  );
};
