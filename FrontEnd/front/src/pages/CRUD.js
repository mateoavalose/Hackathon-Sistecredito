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
    const response = await axios.get(`${API_URL}/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
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
      const response = await axios.get(`${API_URL}/products/${searchId}`);
      setProducts([response.data]); // Reemplazamos el estado de productos con el resultado de la búsqueda
      setSearchId(""); // Limpiamos el campo de búsqueda
    } catch (error) {
      console.error("Error buscando producto:", error);
      alert("No se encontró el producto con ese ID.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Buscar producto por ID"
        className="mt-4 p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSearchById}
        className="ml-2 bg-blue-600 text-white p-2 rounded-lg"
      >
        Buscar
      </button>
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
