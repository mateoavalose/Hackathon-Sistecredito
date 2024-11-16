import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import axios from "axios";

const CRUD = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchId, setSearchId] = useState("");

  const fetchProducts = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    console.log(API_URL);
    const response = await axios.get(`${API_URL}`);
    setProducts(response.data);
  };

  useEffect(() => {
    //fetchProducts();
  }, []);

  const handleProductAdded = async (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    await fetchProducts();
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setProductToEdit(null);
  };

  const handleProductDeleted = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
  };

  const handleSearchById = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    if (!searchId) return;

    try {
      const response = await axios.get(`${API_URL}/${searchId}`);
      setProducts([response.data]); // Reemplazamos el estado de productos con el resultado de la búsqueda
      setSearchId(""); // Limpiamos el campo de búsqueda
    } catch (error) {
      console.error("Error buscando producto:", error);
      alert("No se encontró el producto con ese ID.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Gestión de Productos
      </h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Buscar producto por ID"
          className="mt-6 p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 w-full max-w-md" // Asegúrate de que tenga un ancho máximo
        />
        <button
          onClick={handleSearchById}
          className="mt-3 bg-blue-700 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Buscar
        </button>
      </div>

      <ProductForm
        onProductAdded={handleProductAdded}
        productToEdit={productToEdit}
        onUpdateProduct={handleProductUpdated}
      />
      <ProductList
        products={products}
        onProductUpdated={handleProductUpdated}
        onProductDeleted={handleProductDeleted}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CRUD;
