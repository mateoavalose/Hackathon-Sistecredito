import { useState } from "react";

type Product = {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
};

export const ShowAProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const fetchProduct = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      if (!response.ok) {
        setProduct(null);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      setProduct(null);
    }
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">
          Buscar Producto
        </h1>
        <div className="mb-6">
          <input
            className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el ID del producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <button
          onClick={fetchProduct}
          className="w-full py-4 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Buscar producto
        </button>

        {hasSearched && (
          <div className="mt-8 text-white">
            {product ? (
              <div className="bg-white p-6 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {product.product_name}
                </h2>
                <p className="text-lg text-gray-700 mb-2">
                  <strong>ID: </strong>
                  {product.product_id}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <strong>Stock: </strong>
                  {product.product_stock}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Price: </strong>${product.product_price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-lg text-red-500">Producto no encontrado</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
