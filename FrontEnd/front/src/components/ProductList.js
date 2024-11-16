import React from "react";
import axios from "axios";

const ProductList = ({
  products,
  onProductUpdated,
  onProductDeleted,
  onEdit,
}) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      onProductDeleted(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ul>
      {products.length === 0 ? (
        <li>No hay productos disponibles.</li>
      ) : (
        products.map((product) => (
          <li
            key={product.id}
            className="border p-2 flex justify-between items-center"
          >
            <span>
              {product.product_name} - ${product.product_price} (Stock:{" "}
              {product.product_stock})
            </span>
            <div>
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-500 text-white p-1 mx-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ProductList;
