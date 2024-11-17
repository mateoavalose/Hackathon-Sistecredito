import { useState } from "react";
import axios from "axios";

export const DeleteProduct = () => {
  const [productId, setProductId] = useState("");

  const deleteProduct = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`);
      if (response.status === 200) {
        alert("Producto eliminado");
        setProductId(""); // Limpiar el input después de la eliminación
      } else {
        alert(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <>
      <h1>Delete Product Page</h1>
      <div>
        <input
          placeholder="Ingrese el ID del producto"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={deleteProduct}>Eliminar</button>
      </div>
    </>
  );
};
