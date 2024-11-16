import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ onProductAdded, productToEdit, onUpdateProduct }) => {
  const [product, setProduct] = useState({
    product_id: "",
    product_name: "",
    product_stock: "",
    product_price: "",
  });

  useEffect(() => {
    if (productToEdit) {
      // Ajusta el estado del producto cuando se edita
      setProduct({
        product_id: productToEdit.product_id,
        product_name: productToEdit.product_name,
        product_stock: productToEdit.product_stock,
        product_price: productToEdit.product_price,
      });
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
        // Actualizar producto
        const response = await axios.patch(
          `${API_URL}/products/${product.product_id}`,
          product
        );
        onUpdateProduct(response.data);
      } else {
        // Agregar nuevo producto
        const response = await axios.post(`${API_URL}/products`, product);
        onProductAdded(response.data);
      }
      // Reiniciar el formulario
      setProduct({
        product_id: "",
        product_name: "",
        product_stock: "",
        product_price: "",
      });
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
        <label htmlFor="product_id" className="block text-gray-700 font-medium">
          Id del producto
        </label>
        <input
          type="text"
          name="product_id"
          value={product.product_id}
          onChange={handleChange}
          placeholder="Ingrese el id del producto"
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition duration-200 ease-in-out"
          required
        />
      </div>

      <div>
        <label
          htmlFor="product_name"
          className="block text-gray-700 font-medium"
        >
          Nombre del producto
        </label>
        <input
          type="text"
          name="product_name"
          value={product.product_name}
          onChange={handleChange}
          placeholder="Ingrese el nombre del producto"
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition duration-200 ease-in-out"
          required
        />
      </div>

      <div>
        <label
          htmlFor="product_price"
          className="block text-gray-700 font-medium"
        >
          Precio
        </label>
        <input
          type="number"
          name="product_price"
          value={product.product_price}
          onChange={handleChange}
          placeholder="Ingrese el precio"
          className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition duration-200 ease-in-out"
          required
        />
      </div>

      <div>
        <label
          htmlFor="product_stock"
          className="block text-gray-700 font-medium"
        >
          Stock
        </label>
        <input
          type="number"
          name="product_stock"
          value={product.product_stock}
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
