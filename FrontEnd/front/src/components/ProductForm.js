import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ onProductAdded, productToEdit, onUpdateProduct }) => {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        // Update product
        const response = await axios.put(
          `${API_URL}/products/${product.id}`,
          product
        );
        onUpdateProduct(response.data);
      } else {
        // Add new product
        const response = await axios.post(`${API_URL}/products`, product);
        onProductAdded(response.data);
      }
      // Reset the form
      setProduct({ name: "", price: "", stock: "" });
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        {productToEdit ? "Actualizar Producto" : "Agregar Producto"}
      </h2>

      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium">
          Nombre del producto
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Ingrese el nombre del producto"
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition duration-200 ease-in-out"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-gray-700 font-medium">
          Precio
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Ingrese el precio"
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition duration-200 ease-in-out"
          required
        />
      </div>

      <div>
        <label htmlFor="stock" className="block text-gray-700 font-medium">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Ingrese la cantidad en stock"
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition duration-200 ease-in-out"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {productToEdit ? "Actualizar Producto" : "Agregar Producto"}
      </button>
    </form>
  );
};

export default ProductForm;
