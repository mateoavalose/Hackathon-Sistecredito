import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";

type Product = {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
};

export const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // const API_URL = import.meta.env.VITE_BACKEND_URL;
    axios
      .get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      {/* Contenedor exterior con bordes redondeados */}
      <div className="w-full max-w-6xl p-8 bg-gray-800 rounded-3xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center text-white mb-12">
          Todos los Productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-100 border-4 border-transparent hover:border-blue-500"
            >
              <div className="text-black mb-6">
                <div className="text-2xl font-semibold text-gray-900 mb-2">
                  {product.product_name}
                </div>
                <div className="text-sm text-gray-600 opacity-80 mb-4">
                  <strong>ID:</strong>{" "}
                  <span className="text-gray-900">{product.product_id}</span>
                </div>
              </div>

              <ProductCard
                product_id={product.product_id}
                product_name={product.product_name}
                product_stock={product.product_stock}
                product_price={product.product_price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
