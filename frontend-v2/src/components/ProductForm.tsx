import { useEffect, useState } from "react";
import axios from "axios";

interface ProductFormProps {
  isCreating: boolean;
  productIdToEdit?: string;
}

export const ProductForm = ({
  isCreating,
  productIdToEdit,
}: ProductFormProps) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState<number | undefined>(
    undefined
  );
  const [productPrice, setProductPrice] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isCreating && productIdToEdit) {
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        try {
          const response = await axios.get(
            `${API_URL}/products/${productIdToEdit}`
          );
          const product = response.data;
          setProductId(product.product_id);
          setProductName(product.product_name);
          setProductStock(product.product_stock);
          setProductPrice(product.product_price);
        } catch (error) {
          console.error("Error al obtener el producto:", error);
          alert("No se pudo cargar el producto para editar.");
        }
      }
    };

    fetchProduct();
  }, [isCreating, productIdToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const method = isCreating ? "post" : "patch";
    const endpoint = isCreating
      ? `${API_URL}/products`
      : `${API_URL}/products/${productId}`;
    const payload = {
      product_id: productId,
      product_name: productName,
      product_stock: productStock,
      product_price: productPrice,
    };

    try {
      const response = await axios[method](endpoint, payload);
      alert("Producto guardado");
      setProductId("");
      setProductName("");
      setProductStock(undefined);
      setProductPrice(undefined);
      console.log(response.data);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Error al guardar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6">
          {isCreating ? "Añadir Producto" : "Modificar Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="productId"
              className="block text-white font-semibold mb-2"
            >
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              placeholder="Ingrese el ID del producto"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="product_name"
              className="block text-white font-semibold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Ingrese el nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="product_stock"
              className="block text-white font-semibold mb-2"
            >
              Product Stock
            </label>
            <input
              type="number"
              id="product_stock"
              name="product_stock"
              placeholder="Ingrese el stock del producto"
              value={productStock}
              onChange={(e) => setProductStock(Number(e.target.value))}
              required
              className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="product_price"
              className="block text-white font-semibold mb-2"
            >
              Product Price
            </label>
            <input
              type="number"
              id="product_price"
              name="product_price"
              placeholder="Ingrese el precio del producto"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
              className="w-full p-4 rounded-lg text-lg text-gray-900 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-8 bg-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isCreating ? "Añadir Producto" : "Modificar Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};
