import { useState } from "react";
import { ProductForm } from "../components/ProductForm";

export const ModifyProduct = () => {
  const [productId, setProductId] = useState("");
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div>
        <input
          placeholder="Ingrese el ID del producto"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={() => setShowForm(true)}>Buscar producto</button>
      </div>
      {showForm && (
        <ProductForm isCreating={false} productIdToEdit={productId} />
      )}
    </>
  );
};
