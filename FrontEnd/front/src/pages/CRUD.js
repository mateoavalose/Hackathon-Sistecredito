import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import axios from "axios";

const CRUD = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>
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
